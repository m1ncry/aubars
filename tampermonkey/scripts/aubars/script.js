// ==UserScript==
// @name         hi
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Says hi from tampermonkey menu.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  const territory = 1;

  const cards = [
    '18/033663',
    '18/000001',
    '18/000002'
  ];

  const DELAYS = {
    afterCardNumber: 500,
    afterMedOrg:     3000,
    afterEditClick:  3000,
    afterRegType:    3000,
    afterOkRegType:  3000,
    afterOkEdit:     3000,
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function processCard(card) {
    console.log('=== Обработка карты:', card, '===');

    setCard(card);
    findClick();

    await sleep(DELAYS.afterCardNumber);
    cardNumber();

    await sleep(DELAYS.afterMedOrg);
    medOrg();

    await sleep(DELAYS.afterEditClick);
    editClick();

    await sleep(DELAYS.afterRegType);
    setRegType(territory);

    await sleep(DELAYS.afterOkRegType);
    okRegType();

    await sleep(DELAYS.afterOkEdit);
    okEditClick();

    await sleep(2000);
  }

  async function hi() {
    for (let i = 0; i < cards.length; i++) {
      try {
        await processCard(cards[i]);
        console.log(`Карта ${cards[i]} обработана (${i + 1}/${cards.length})`);
      } catch (e) {
        console.error(`Ошибка на карте ${cards[i]}:`, e);
      }
    }
    console.log('Все карты обработаны.');
  }


  function setCard(card) {
    const input = document.querySelector('input[placeholder="Номер карты"]');
    console.log(input);
    input.value = card;
  }

  function findClick() {
    const find = document.querySelector('table[name="ButSearchPatient"]');
    console.log(find);
    find.click();
  }

  function cardNumber() {
    const num = document.querySelector('td[name="CARD_NUMBER_COL"] a');
    console.log(num);
    num.click();
  }

  function medOrg() {
    const med = document.querySelector('div[name="PMC_AnketaPageControl2"] .TabCenter');
    console.log(med);
    med.click();
  }

  function editClick() {
    const edit = document.querySelector('#PopUp_Menu_P_AGENT_REGISTRATION_GRID tr.item-base img.edit');
    console.log(edit);
    edit.click();
  }

  function setRegType(type) {
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

  function okRegType() {
    const ok = document.querySelector('table[name="BUTTON_OK"]');
    console.log(ok);
    ok.click();
  }

  function okEditClick() {
    const ok = document.querySelector('table[cmptype="Button"][onclick*="closeWindow"]');
    console.log(ok);
    ok.click();
  }

  GM_registerMenuCommand("hi", hi);
})();
