// ==UserScript==
// @name         Remove Facebook Spam
// @namespace    http://tampermonkey.net/
// @version      2025-04-22
// @description  Removes some spammy elements on all Facebook pages
// @author       Cyrmax
// @match        https://facebook.com/*
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepseek.com
// @grant        none
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
