// ==UserScript==
// @name         hi
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Says hi from tampermonkey menu.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
  'use strict';

  function hi() {
    alert("hi");
  }

  GM_registerMenuCommand("hi", hi);
})();
