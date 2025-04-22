// ==UserScript==
// @name         Remove Facebook Spam
// @namespace    http://tampermonkey.net/
// @copyright Cyrmax (2025)
// @version      2025-04-22.3
// @description  Hides some spammy redundant elements on all Facebook pages
// @description:ru  Скрывает избыточные элементы на всех страницах на Facebook
// @description:hu  Automatikusan elrejt bizonyos kéretlen (spam) elemeket valamennyi Facebook-oldalon
// @author       Cyrmax
// @source https://github.com/cyrmax/removeFacebookSpam
// @match        https://facebook.com/*
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepseek.com
// @grant        none
// @updateURL https://github.com/cyrmax/removeFacebookSpam/releases/download/latest/removeFacebookSpam.user.js
// @downloadURL https://github.com/cyrmax/removeFacebookSpam/releases/download/latest/removeFacebookSpam.user.js
// @supportURL https://github.com/cyrmax/removeFacebookSpam/issues
// ==/UserScript==

(function () {
    const observer = new MutationObserver((mutations) => {
        if (!mutations.some((mutation) => {
            return mutation.type === "childList" || mutation.type === "attributes";
        })) return;
        const elems = getAllSpamElements();
        for (const elem of elems) {
            elem.setAttribute("aria-hidden", true);
        }
    });
    observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: false
    });
})();

function getAllSpamElements() {
    const allSpans = document.querySelectorAll('blockquote > span > span');
    const matchingElements = Array.from(allSpans).filter(span =>
        span.textContent.trim().toLowerCase() === "facebook" && (!span.hasAttribute("aria-hidden") || span.getAttribute("aria-hidden") === 'false')
    );
    return matchingElements;
}
