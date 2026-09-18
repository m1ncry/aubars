# bars_automation.py
"""
Автоматизация выбора типа регистрации «Территориальный» в БАРС.

Что делает:
  1. Читает список пациентов из Excel.
  2. Авторизуется в веб-интерфейсе БАРС.
  3. Для каждого пациента: открывает карту → вкладка «Прикрепление к МО»
     → «Редактировать» → выбирает «Территориальный» → «Ок».
  4. Пишет лог успешных операций и Excel-файл с ошибками.
"""

import asyncio
import logging
from datetime import datetime
from pathlib import Path

import pandas as pd
from playwright.async_api import async_playwright, TimeoutError as PWTimeout


# ============================================================
#                        НАСТРОЙКИ
# ============================================================

BASE_DIR = Path(__file__).parent

BARS_URL          = "https://bars.example.ru/"       # ← URL вашего БАРС
BARS_LOGIN        = "ВАШ_ЛОГИН"                       # ← логин
BARS_PASSWORD     = "ВАШ_ПАРОЛЬ"                      # ← пароль

EXCEL_IN          = BASE_DIR / "patients.xlsx"        # ← входной файл
EXCEL_ERRORS      = BASE_DIR / "logs" / "errors.xlsx"
LOG_SUCCESS       = BASE_DIR / "logs" / "success.log"
STORAGE_STATE     = BASE_DIR / "storage" / "state.json"

ID_COLUMN         = "patient_id"                      # ← колонка с ID пациента
REG_TYPE_VALUE    = "Территориальный"

HEADLESS          = False       # первый прогон — с окном, потом True
PAUSE_BETWEEN     = 0.2         # пауза между пациентами (сек)
SAVE_EVERY        = 100         # как часто сбрасывать ошибки на диск

# Селекторы — ЗАМЕНИТЕ на реальные из вашего интерфейса БАРС
SEL = {
    "login_input":     "input[name='username']",
    "password_input":  "input[name='password']",
    "login_button":    "button[type='submit']",

    "search_input":    "input#patient-search",
    "search_button":   "button#search-btn",
    "first_result":    "table.results tbody tr:first-child a",

    "tab_attachment":  "a[href*='attachment']",       # вкладка «Прикрепление к МО»
    "btn_edit":        "button#edit-attachment",
    "reg_type_select": "select#reg-type",
    "btn_ok":          "button#ok-save",

    # Что появляется после успешного сохранения (тост/сообщение/статус)
    "save_confirmed":  "text=Сохранено",
}


# ============================================================
#                        ЛОГИРОВАНИЕ
# ============================================================

LOG_SUCCESS.parent.mkdir(parents=True, exist_ok=True)
STORAGE_STATE.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler(LOG_SUCCESS, encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
log = logging.getLogger("bars")


# ============================================================
#                          УТИЛИТЫ
# ============================================================

def load_patients(path: Path) -> list[str]:
    """Читает Excel и возвращает список ID пациентов."""
    if not path.exists():
        raise FileNotFoundError(f"Не найден файл: {path}")

    df = pd.read_excel(path, dtype=str)
    if ID_COLUMN not in df.columns:
        raise ValueError(
            f"В файле нет колонки '{ID_COLUMN}'. "
            f"Доступные колонки: {list(df.columns)}"
        )
    return df[ID_COLUMN].dropna().astype(str).str.strip().tolist()


def save_errors(errors: list[list]) -> None:
    """Сохраняет список ошибок в Excel."""
    if not errors:
        return
    EXCEL_ERRORS.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(
        errors, columns=["patient_id", "reason", "time"]
    ).to_excel(EXCEL_ERRORS, index=False)


# ============================================================
#                       ШАГИ СЦЕНАРИЯ
# ============================================================

async def login(page) -> None:
    """Авторизация. Если сессия уже активна — пропускаем."""
    await page.goto(BARS_URL, wait_until="domcontentloaded")

    # Проверяем, не залогинены ли уже
    if await page.locator(SEL["search_input"]).count() > 0:
        log.info("Уже авторизованы, вход не требуется")
        return

    await page.fill(SEL["login_input"], BARS_LOGIN)
    await page.fill(SEL["password_input"], BARS_PASSWORD)
    await page.click(SEL["login_button"])
    await page.wait_for_selector(SEL["search_input"], timeout=30_000)
    log.info("Авторизация выполнена")


async def process_patient(page, patient_id: str) -> str | None:
    """
    Обрабатывает одного пациента.
    Возвращает None при успехе или строку с описанием ошибки.
    """
    try:
        # 1. Поиск пациента
        search = page.locator(SEL["search_input"])
        await search.fill("")
        await search.fill(patient_id)
        await page.click(SEL["search_button"])

        # 2. Переход в карту (первый результат)
        first = page.locator(SEL["first_result"])
        await first.wait_for(state="visible", timeout=10_000)
        await first.click()

        # 3. Вкладка «Прикрепление к МО»
        await page.click(SEL["tab_attachment"])
        await page.wait_for_selector(SEL["btn_edit"], timeout=10_000)

        # 4. Кнопка «Редактировать»
        await page.click(SEL["btn_edit"])

        # 5. Выбор «Территориальный»
        select = page.locator(SEL["reg_type_select"])
        await select.wait_for(state="visible", timeout=10_000)
        await select.select_option(label=REG_TYPE_VALUE)

        # 6. Кнопка «Ок»
        await page.click(SEL["btn_ok"])

        # 7. Ждём подтверждения сохранения
        await page.wait_for_selector(SEL["save_confirmed"], timeout=10_000)

        return None

    except PWTimeout as e:
        return f"timeout: {e}"
    except Exception as e:
        return f"error: {type(e).__name__}: {e}"


# ============================================================
#                       ОСНОВНОЙ ЦИКЛ
# ============================================================

async def main() -> None:
    patients = load_patients(EXCEL_IN)
    log.info(f"Загружено пациентов: {len(patients)}")

    errors: list[list] = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=HEADLESS)

        ctx_kwargs = {"viewport": {"width": 1600, "height": 900}}
        if STORAGE_STATE.exists():
            ctx_kwargs["storage_state"] = str(STORAGE_STATE)

        context = await browser.new_context(**ctx_kwargs)
        page = await context.new_page()

        await login(page)

        # Сохраняем cookies/localStorage, чтобы не логиниться каждый раз
        await context.storage_state(path=str(STORAGE_STATE))

        for i, pid in enumerate(patients, 1):
            err = await process_patient(page, pid)
            if err:
                log.warning(f"[{i}/{len(patients)}] {pid} → {err}")
                errors.append([
                    pid, err,
                    datetime.now().isoformat(timespec="seconds"),
                ])
            else:
                log.info(f"[{i}/{len(patients)}] {pid} → OK")

            if i % SAVE_EVERY == 0:
                save_errors(errors)

            await asyncio.sleep(PAUSE_BETWEEN)

        save_errors(errors)
        await context.close()
        await browser.close()

    log.info(f"Готово. Всего: {len(patients)}, ошибок: {len(errors)}")


if __name__ == "__main__":
    asyncio.run(main())