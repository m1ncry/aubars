// ==UserScript==
// @name         set-registration-type-for-many-cards
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Sets registration type for many cards.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  // main
  'use strict';
  const REGISTRATION_TYPE_TERRITORY = 1;
  const CARDS = [
    '18/033663',
    '18/000001',
    '18/000002'
  ];
  const MAXIMUM_DELAY = 3000;
  async function main() {
    for (let i = 0; i < CARDS.length; i++) {
      try {
        await processCard(CARDS[i]);
        console.log(`Карта ${CARDS[i]} обработана (${i + 1}/${CARDS.length})`);
      } catch (e) {
        console.error(`Ошибка на карте ${CARDS[i]}:`, e);
      }
    }
    console.log('Все карты обработаны.');
  }
  GM_registerMenuCommand("Установить тип привязки для множества карт", main);

  // processCard
  async function processCard(card) {
    console.log('=== Обработка карты:', card, '===');

    await setCard(card);
    clickOnFindButton();

    await clickOnEditCardLink();

    await sleep(MAXIMUM_DELAY);
    clickOnMedicalOrganizationTab();

    await sleep(MAXIMUM_DELAY);
    clickOnEditRegistrationButton();

    await sleep(MAXIMUM_DELAY);
    selectRegistrationType(REGISTRATION_TYPE_TERRITORY);

    await sleep(MAXIMUM_DELAY);
    clickOnSaveRegistrationButton();

    await sleep(MAXIMUM_DELAY);
    clickOnSaveCardButton();

    await sleep(MAXIMUM_DELAY);
  }
  async function setCard(card) {
    const input = await waitForElement('input[placeholder="Номер карты"]');
    input.value = card;
  }
  function clickOnFindButton() {
    const find = document.querySelector('table[name="ButSearchPatient"]');
    console.log(find);
    find.click();
  }
  async function clickOnEditCardLink() {
    const editCardLink = await waitForElement('td[name="CARD_NUMBER_COL"] a');
    editCardLink.click();
  }
  function clickOnMedicalOrganizationTab() {
    const med = document.querySelector('div[name="PMC_AnketaPageControl2"] .TabCenter');
    console.log(med);
    med.click();
  }
  function clickOnEditRegistrationButton() {
    const edit = document.querySelector('#PopUp_Menu_P_AGENT_REGISTRATION_GRID tr.item-base img.edit');
    console.log(edit);
    edit.click();
  }
  function selectRegistrationType(type) {
    const combo = document.querySelector('table[name="REG_TYPE"]');
    const input = combo.querySelector('input.input-ctrl');
    const item = combo.querySelector(
      `tr[cmptype="ComboItem"][comboboxname="REG_TYPE"][value="${type}"]:not([sample="true"])`
    );

    if (!item) {
      console.warn('Не найдено value=' + type);
      return;
    }

    combo.setAttribute('keyvalue', type);

    combo.querySelectorAll('tr[cmptype="ComboItem"]').forEach(tr => {
      tr.classList.remove('combo-item-selected');
      tr.removeAttribute('selected');
    });
    item.classList.add('combo-item-selected');
    item.setAttribute('selected', 'true');

    const caption = item.querySelector('span[cont="itemcaption"]');
    input.value = caption ? caption.textContent.trim() : '';

    try {
      if (typeof ComboBox_AfterRefresh === 'function') {
      }
    } catch (e) { /* ignore */ }

    input.dispatchEvent(new Event('change', { bubbles: true }));
    combo.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

    console.log('Готово. keyvalue=' + combo.getAttribute('keyvalue') +
      ', value=' + input.value);
  }
  function clickOnSaveRegistrationButton() {
    const ok = document.querySelector('table[name="BUTTON_OK"]');
    console.log(ok);
    ok.click();
  }
  function clickOnSaveCardButton() {
    const ok = document.querySelector('table[cmptype="Button"][onclick*="closeWindow"]');
    console.log(ok);
    ok.click();
  }

  // static
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Waits for an element matching the selector to appear in the DOM.
   * @param {string} selector - CSS selector to wait for.
   * @param {number} duration - Timeout in milliseconds.
   * @returns {Promise<HTMLElement>} Resolves with the matched element.
   * @throws {Error} If the element is not found within `duration` ms.
   */
  const waitForElement = (selector, duration = 5000) => {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(selector);
      if (existing) {
        resolve(existing);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          cleanup();
          resolve(element);
        }
      });

      let timeout = null;
      const cleanup = () => {
        observer.disconnect();
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: undefined,
      });
      timeout = setTimeout(() => {
        cleanup();
        reject(new Error(
            `waitForElement: element "${selector}" not found within ${duration} ms`
        ));
      }, duration);
    });
  }
})();
