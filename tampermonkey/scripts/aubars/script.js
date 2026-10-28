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
    await clickOnFindButton();
    await clickOnEditCardLink();
    await clickOnMedicalOrganizationTab();
    await clickOnEditRegistrationButton();
    await selectRegistrationType(REGISTRATION_TYPE_TERRITORY);
    await clickOnSaveRegistrationButton();
    await clickOnSaveCardButton();
  }
  async function setCard(card) {
    const input = await waitForElement('input[placeholder="Номер карты"]');
    input.value = card;
  }
  async function clickOnFindButton() {
    const button = await waitForElement('table[name="ButSearchPatient"]');
    button.click();
  }
  async function clickOnEditCardLink() {
    const link = await waitForElement('td[name="CARD_NUMBER_COL"] a');
    link.click();
  }
  async function clickOnMedicalOrganizationTab() {
    const tab = await waitForElement('div[name="PMC_AnketaPageControl2"] .TabCenter');
    tab.click();
  }
  async function clickOnEditRegistrationButton() {
    const button = await waitForElement('#PopUp_Menu_P_AGENT_REGISTRATION_GRID tr.item-base img.edit');
    button.click();
  }
  async function selectRegistrationType(type) {
    const select = await waitForElement('table[name="REG_TYPE"]');
    const input = select.querySelector('input.input-ctrl');
    const item = select.querySelector(
      `tr[cmptype="ComboItem"][comboboxname="REG_TYPE"][value="${type}"]:not([sample="true"])`
    );

    if (!item) {
      console.warn('Не найдено value=' + type);
      return;
    }

    select.setAttribute('keyvalue', type);

    select.querySelectorAll('tr[cmptype="ComboItem"]').forEach(tr => {
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
    select.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

    console.log('Готово. keyvalue=' + select.getAttribute('keyvalue') +
      ', value=' + input.value);
  }
  async function clickOnSaveRegistrationButton() {
    const button = await waitForElement('table[name="BUTTON_OK"]');
    button.click();
  }
  async function clickOnSaveCardButton() {
    const button = await waitForElement('table[cmptype="Button"][onclick*="closeWindow"]');
    button.click();
  }

  // static
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
