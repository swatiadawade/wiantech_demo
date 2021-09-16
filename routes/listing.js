const router = require("express").Router();
const verify = require("../routes/verifyToken");
const Listing = require("../model/listing");

//Get all Listing
router.get("/", verify, async (req, res) => {
    try{
        const listings = await Listing.find();
        //res.json(listings);
        res.json({totalCount:listings.length, data: listings});
    } catch(error){
        res.json({message: error});
    }
});

//Single Listing
router.get("/:listingId", verify, async (req, res) => {
    try{
        const listings = await Listing.findById(req.params.listingId);
        res.json(listings);
    } catch(error){
        res.json({message: error});
    }
});

//Update Listing
router.put("/:listingId", verify, async (req, res) => {
    try{
        const listing = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            description: req.body.description,
        };
        const updatedlistings = await Listing.findByIdAndUpdate(
            { _id: req.params.listingId },
            listing
        );
        res.json(updatedlistings);
    } catch(error){
        res.json({message: error});
    }
});

//Delete Listing
router.delete("/:listingId", verify, async (req, res) => {
    try{
        const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
        res.json(removeListing);
    } catch(error){
        res.json({message: error});
    }
});

//Add new Listing
router.post("/", verify, async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        description: req.body.description,
    });
    try{
        const savedListing = await listing.save();
        res.send(savedListing);
    } catch(error){
        res.status(400).send(error);
    }
    res.send('Add New Listings');
});

module.exports = router;