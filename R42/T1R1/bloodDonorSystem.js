"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
var fs = require("fs");
var path = require("path");
// Load the donor data from the JSON file
var donorData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
// Define a function to search for donors by blood type
function searchDonorsByBloodType(bloodType) {
    return donorData.filter(function (donor) { return donor.bloodType === bloodType; });
}
// Define a function to get the top 10 donors nearby
function getTop10DonorsNearby(location) {
    var nearbyDonors = donorData.filter(function (donor) {
        var distance = calculateDistance(location, donor.location);
        return distance <= 100; // Filter donors within 100 miles
    });
    return nearbyDonors.slice(0, 10); // Return the top 10 donors
}
// Define a function to calculate the distance between two locations
function calculateDistance(location1, location2) {
    var lat1 = location1.lat * Math.PI / 180;
    var lng1 = location1.lng * Math.PI / 180;
    var lat2 = location2.lat * Math.PI / 180;
    var lng2 = location2.lng * Math.PI / 180;
    var dLat = lat2 - lat1;
    var dLng = lng2 - lng1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = 6371 * c; // Earth's radius in kilometers
    return distance * 0.621371; // Convert kilometers to miles
}
// Define a function to contact a donor
function contactDonor(donor, message) {
    console.log("Contacting donor ".concat(donor.name, " with message: ").concat(message));
}
// Example usage:
var recipient = {
    id: 1,
    name: 'John Doe',
    bloodType: 'A+',
    location: {
        lat: 37.7749,
        lng: -122.4194,
        city: 'San Francisco',
        state: 'CA'
    }
};
var donors = searchDonorsByBloodType(recipient.bloodType);
console.log("Found ".concat(donors.length, " donors with blood type ").concat(recipient.bloodType));
var nearbyDonors = getTop10DonorsNearby(recipient.location);
console.log("Found ".concat(nearbyDonors.length, " donors nearby"));
contactDonor(nearbyDonors[0], 'Hello, I am in need of a blood donation.');
