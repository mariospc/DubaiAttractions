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

const updateAttraction = async(req, res) => {

    const { db } = req.app.locals.share;

    try {
        const attraction = await db.DubaiAttractionQuery.get(req.body.attraction_id);
        if (req.body.title !== undefined){
            attraction.set("title", req.body.title);
        } 
        if (req.body.url !== undefined){
            attraction.set("url", req.body.url);
        }
        if (req.body.location !== undefined){
            attraction.set("location", req.body.location);
        }
        if (req.body.short_info !== undefined){
            attraction.set("short_info", req.body.short_info);
        }
        if (req.body.description !== undefined){
            attraction.set("description", req.body.description);
        }
        if (req.body.photo !== undefined){
            attraction.set("photo", req.body.photo);
        }
        await attraction.save();
        
        res.status(200).json({message: 'Updated successfully'});
    }catch (error){
        res.status(401).json({message: "Unauthorized User"});
    }

    
}

module.exports = {
    getAllAttractions,
    getAttraction,
    updateAttraction
}