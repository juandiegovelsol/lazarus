var donors = require('./data.json');
var donorListElement = document.getElementById('donor-list');
var searchFormElement = document.getElementById('search-form');
var contactFormElement = document.getElementById('contact-form');
var renderDonorList = function () {
    donorListElement.innerHTML = '';
    donors.forEach(function (donor) {
        var donorElement = document.createElement('div');
        donorElement.innerHTML = "\n        <h2>".concat(donor.name, "</h2>\n        <p>Blood Type: ").concat(donor.bloodType, "</p>\n        <p>Location: ").concat(donor.location.city, ", ").concat(donor.location.state, "</p>\n      ");
        donorListElement.appendChild(donorElement);
    });
};
var handleSearch = function (event) {
    event.preventDefault();
    var bloodType = document.getElementById('blood-type').value;
    var location = document.getElementById('location').value;
    var filteredDonors = donors.filter(function (donor) {
        return donor.bloodType === bloodType && donor.location.city.toLowerCase().includes(location.toLowerCase());
    });
    donorListElement.innerHTML = '';
    filteredDonors.forEach(function (donor) {
        var donorElement = document.createElement('div');
        donorElement.innerHTML = "\n        <h2>".concat(donor.name, "</h2>\n        <p>Blood Type: ").concat(donor.bloodType, "</p>\n        <p>Location: ").concat(donor.location.city, ", ").concat(donor.location.state, "</p>\n      ");
        donorListElement.appendChild(donorElement);
    });
};
var handleContact = function (event) {
    event.preventDefault();
    var donorId = parseInt(document.getElementById('donor-id').value);
    var message = document.getElementById('message').value;
    var donor = donors.find(function (donor) { return donor.id === donorId; });
    if (donor) {
        // Send message to donor ( implementation depends on the messaging system used )
        console.log("Message sent to ".concat(donor.name, ": ").concat(message));
    }
    else {
        console.log('Donor not found');
    }
};
renderDonorList();
searchFormElement.addEventListener('submit', handleSearch);
contactFormElement.addEventListener('submit', handleContact);
