const Listing = require("../models/listing");
const axios = require("axios");

//CONTROLLER FUNCTIONS
//INDEX
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings/index", { allListings });

};

module.exports.renderNewForm = (req, res) => {

    res.render("listings/new");
};

module.exports.showListing=async (req, res) => {
    // console.log("SHOW ROUTE HIT");
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ "path": "reviews", populate: { "path": "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
};



module.exports.createListing=async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
   
    
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image= { url, filename };

     // Geocoding
    const location = req.body.listing.location;

    const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
            params: {
                address: `${req.body.listing.location}, ${req.body.listing.country}`,
                key: process.env.MAP_TOKEN,
            },
        }
    );
if (!response.data.results.length) {
    req.flash("error", "Invalid location entered!");
    return res.redirect("/listings/new");
}

const data = response.data.results[0].geometry.location;

newListing.geometry = {
    type: "Point",
    coordinates: [data.lng, data.lat],
};


    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");


};

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", " Listing does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;

    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") { 
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();}
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted Listing: ", deletedListing);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};