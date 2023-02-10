async function loadModule(tagName, cName, scriptLoc, fileName) {

    /* Adding the HTML, which can also be done by hand */
    if (tagName.indexOf('-') > -1) {
        /* Productteam wilt mogelijk bepalen waar de elementen komen */
        const elem = document.createElement(tagName);
        document.body.appendChild(elem);
        const class2use = await import(`${scriptLoc}/${fileName}`);
        window.customElements.define(tagName, class2use.default);
    } else {
        throw new Error ('tagName has to contain a dash for future proofing HTML 5');
    }
}

window.onload = function() {
    // This can be done in this way slightly 'headless', or in HTML itself.
    // Could add attribute(s)/events to subscribe to
    loadModule('bgg-list', 'BggList', '.', 'listLib.js');
    loadModule('bgg-cart', 'BggCart', '.', 'cartLib.js');
}
