const getAllAttractions = function (req, res) {
    const { db } = req.app.locals.share;

    db.DubaiAttractionQuery.ascending("order");
    db.DubaiAttractionQuery.find().then(function(res){
        console.log(res);
    })
}

const getAttraction = function (req, res) {
    const { db } = req.app.locals.share;

    console.log(req.query.attraction_id);
    db.DubaiAttractionQuery.get(req.query.attraction_id).then(function(res){
        res.status(200).json(res);
    })

}

module.exports = {
    getAllAttractions,
    getAttraction
}