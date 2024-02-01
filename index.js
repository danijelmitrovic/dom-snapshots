let domSnapshot = {
    date: new Date().toISOString(),
    surface: 0,
    domObjects: []
};

const generate = function (element) {
    const attributeId = "data-test-id";
    
    const elementChildren = element.children;
    let elementIndex = 1;

    for (const elementChild of elementChildren) {
        const rect = elementChild.getBoundingClientRect();
        let valuePrefix = "";

        const parentAttributeIdValue = elementChild.parentElement.getAttribute(attributeId);
        if (parentAttributeIdValue) {
            valuePrefix = parentAttributeIdValue;
        }
        let attributeIdValue = valuePrefix + elementChild.localName.charAt(0) + elementIndex;
        elementChild.setAttribute(attributeId, attributeIdValue);

        const domObject = {
            id: attributeIdValue,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            left: Math.round(rect.left),
            top: Math.round(rect.top)
        }
        domSnapshot.surface += Math.round(rect.width) * Math.round(rect.height);
        domSnapshot.domObjects.push(domObject);

        elementIndex++;
        generate(elementChild);
    }

    return domSnapshot;
}

module.exports = function domSnapshots(element) {
    return generate(element);
}