const addDashedClasses = function (elementClass, tagInfoAttrs = false ) {
    if ( !tagInfoAttrs ) return elementClass;
    let prefix = elementClass + "--";
    return elementClass + " " + prefix + tagInfoAttrs;
}

module.exports = {
    addDashedClasses: addDashedClasses,
};