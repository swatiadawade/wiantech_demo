const mongooes = require("mongoose");

const listingSchema = new mongooes.Schema({
title: String,
price: String,
locality: String,
description: String
});

module.exports = mongooes.model("Listing", listingSchema);