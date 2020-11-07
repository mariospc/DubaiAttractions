const { error } = require('console');
const request = require('request');
const Parse = require('parse/node');
const sharp = require('sharp');


const listAttraction = async (req, res) => {
    const { db } = req.app.locals.share;

    try {
        const DubaiAttractionObj = Parse.Object.extend('dubai_attraction');
        const DubaiAttractionQuery = new Parse.Query(DubaiAttractionObj);
        DubaiAttractionQuery.ascending("order");
        const attractions = await DubaiAttractionQuery.find();
        res.status(200).json(attractions);
    }catch (error){
        res.status(400).json({message: "Error on getAttractions"})
    }
};

const getAttraction = async (req, res) => {
    const { db } = req.app.locals.share;

    try{
        const DubaiAttractionObj = Parse.Object.extend('dubai_attraction');
        const DubaiAttractionQuery = new Parse.Query(DubaiAttractionObj);
        const attraction = await DubaiAttractionQuery.get(req.params.id);
        res.status(200).json(attraction)

    }catch(error){
        res.status(400).json({message: "Error on getAttraction"})
    }
};

const updateAttraction = async(req, res) => {
    const { db } = req.app.locals.share;
    try {
        const DubaiAttractionObj = Parse.Object.extend('dubai_attraction');
        const DubaiAttractionQuery = new Parse.Query(DubaiAttractionObj);
        const attraction = await DubaiAttractionQuery.get(req.body.attraction_id);

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
            const file = new Parse.File("image.png", { base64: req.body.photo},"image/png");
            await file.save().then(result => {
                attraction.set("photo", result);
                
            }),(error =>{
                console.log('Error on loading image',error);
            });
        }
        attraction.save({},{ useMasterKey: true }).then(result =>{
            res.status(200).json({message: 'Updated successfully'});
        }),error => {
            res.status(400).json({message: 'Update failed'})
        };
    
            // const imageUrl = result.url();
            // request({ uri: imageUrl, encoding: null }, (err, response, body) => {
            //     //body has a value
            //     if (!err && response.statusCode === 200) {
            //         console.log('body',body);
            //         sharp(imageUrl)
            //             .resize(250,250)
            //             .toBuffer('attraction.png')
            //             .then((data) => {
            //             console.log(typeof data);
            //             attraction.set("photo", data);
            //             attraction.save({},{ useMasterKey: true }).then(result =>{
            //                 res.status(200).json({message: 'Updated successfully'});
            //             })
            //             .catch( err => { console.log('error', err) });
            //         }).catch( err => { console.log('last error', err) });;
            //     }
            // })
            
    }catch (error){
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }

    
}

module.exports = {
    listAttraction,
    getAttraction,
    updateAttraction
}