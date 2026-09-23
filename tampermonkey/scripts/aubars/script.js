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

  const cards = [
    '18/017025',
  ];

  function hi() {
    setCard(cards[0]);
    findClick();
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

  GM_registerMenuCommand("hi", hi);
})();

