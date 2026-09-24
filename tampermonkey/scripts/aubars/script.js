// ==UserScript==
// @name         hi
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Says hi from tampermonkey menu.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
  'use strict';

  const territory = 1;

  const cards = [
    '18/017025',
  ];

  function hi() {
    setCard(cards[0]);
    findClick();
    setTimeout(cardNumber, 500);
    setTimeout(medOrg, 5000);
    setTimeout(editClick, 3000);
    setRegType(territory);
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
    const input = document.querySelector('table[name="REG_TYPE"] input.input-ctrl');
    console.log(input);
    input.value = type;
  }

  GM_registerMenuCommand("hi", hi);
})();

