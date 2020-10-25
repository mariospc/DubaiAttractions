const DubaiAttractionObj = Parse.Object.extend('dubai_attraction');
const DubaiAttractionQuery = new Parse.Query(DubaiAttractionObj);

module.exports = {
    DubaiAttractionQuery,
    DubaiAttractionObj
} 