// ==UserScript==
// @name         wait-for-element
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Waits for button element example.
// @author       managanemeke@gmail.com
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// ==/UserScript==

(async () => {
  'use strict';

  const main = async () => {
    try {
      const button = await waitForElement('button', 5000);
      button.click();
    } catch (error) {
      console.error(error);
    }
  }

  GM_registerMenuCommand("wait-for-element", main);

  /**
   * Waits for an element matching the selector to appear in the DOM.
   * @param {string} selector - CSS selector to wait for.
   * @param {number} duration - Timeout in milliseconds.
   * @returns {Promise<HTMLElement>} Resolves with the matched element.
   * @throws {Error} If the element is not found within `duration` ms.
   */
  const waitForElement = (selector, duration) => {
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
