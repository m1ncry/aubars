// ==UserScript==
// @name         hi
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Says hi from context menu.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @run-at       context-menu
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  alert("hi");
})();
