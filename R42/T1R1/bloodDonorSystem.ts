// Import required modules
import * as fs from 'fs';
import * as path from 'path';

// Define the Donor interface
interface Donor {
  id: number;
  name: string;
  bloodType: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
}

// Define the Recipient interface
interface Recipient {
  id: number;
  name: string;
  bloodType: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
}

// Load the donor data from the JSON file
const donorData: Donor[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Define a function to search for donors by blood type
function searchDonorsByBloodType(bloodType: string): Donor[] {
  return donorData.filter((donor) => donor.bloodType === bloodType);
}

// Define a function to get the top 10 donors nearby
function getTop10DonorsNearby(location: { lat: number; lng: number }): Donor[] {
  const nearbyDonors: Donor[] = donorData.filter((donor) => {
    const distance = calculateDistance(location, donor.location);
    return distance <= 100; // Filter donors within 100 miles
  });

  return nearbyDonors.slice(0, 10); // Return the top 10 donors
}

// Define a function to calculate the distance between two locations
function calculateDistance(location1: { lat: number; lng: number }, location2: { lat: number; lng: number }): number {
  const lat1 = location1.lat * Math.PI / 180;
  const lng1 = location1.lng * Math.PI / 180;
  const lat2 = location2.lat * Math.PI / 180;
  const lng2 = location2.lng * Math.PI / 180;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = 6371 * c; // Earth's radius in kilometers

  return distance * 0.621371; // Convert kilometers to miles
}

// Define a function to contact a donor
function contactDonor(donor: Donor, message: string): void {
  console.log(`Contacting donor ${donor.name} with message: ${message}`);
}

// Example usage:
const recipient: Recipient = {
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

const donors: Donor[] = searchDonorsByBloodType(recipient.bloodType);
console.log(`Found ${donors.length} donors with blood type ${recipient.bloodType}`);

const nearbyDonors: Donor[] = getTop10DonorsNearby(recipient.location);
console.log(`Found ${nearbyDonors.length} donors nearby`);

contactDonor(nearbyDonors[0], 'Hello, I am in need of a blood donation.');