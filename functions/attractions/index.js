const getAllAttractions = async (req, res) => {
    const { db } = req.app.locals.share;

    try {
        db.DubaiAttractionQuery.ascending("order");
        const attractions = await db.DubaiAttractionQuery.find();
        res.status(200).json(attractions);
    }catch (error){
        res.status(400).json({message: "Error on getAttractions"})
    }
};

const getAttraction = async (req, res) => {
    const { db } = req.app.locals.share;

    try{
        const attraction = await db.DubaiAttractionQuery.get(req.query.attraction_id);
        res.status(200).json(attraction)

    }catch(error){
        res.status(400).json({message: "Error on getAttraction"})
    }

};

module.exports = {
    getAllAttractions,
    getAttraction
}