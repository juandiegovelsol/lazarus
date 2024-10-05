import * as fs from "fs/promises";
import { Donor } from "./Donor";
import { Recipient } from "./Recipient";

async function loadDonorData(filePath: string): Promise<Donor[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

function searchDonorsByBloodType(donors: Donor[], bloodType: string): Donor[] {
  return donors.filter((donor) => donor.bloodType === bloodType);
}

function getTop10DonorsNearby(
  donors: Donor[],
  location: { lat: number; lng: number }
): Donor[] {
  const nearbyDonors = donors.filter((donor) => {
    const distance = calculateDistance(location, donor.location);
    return distance <= 100; // Filter donors within 100 miles
  });

  return nearbyDonors.slice(0, 10);
}

function calculateDistance(
  location1: { lat: number; lng: number },
  location2: { lat: number; lng: number }
): number {
  const lat1 = (location1.lat * Math.PI) / 180;
  const lng1 = (location1.lng * Math.PI) / 180;
  const lat2 = (location2.lat * Math.PI) / 180;
  const lng2 = (location2.lng * Math.PI) / 180;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = 6371 * c; // Earth's radius in kilometers
  return distance * 0.621371; // Convert kilometers to miles
}

async function main() {
  const donors: Donor[] = await loadDonorData("../data.json");
  const recipient: Recipient = {
    id: 1,
    name: "John Doe",
    bloodType: "A+",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      city: "San Francisco",
      state: "CA",
    },
  };

  const matchedDonors = searchDonorsByBloodType(donors, recipient.bloodType);
  console.log(
    `Found ${matchedDonors.length} donors with blood type ${recipient.bloodType}`
  );

  const nearbyDonors = getTop10DonorsNearby(donors, recipient.location);
  console.log(`Found ${nearbyDonors.length} nearby donors.`);

  // Functionality to contact donors without revealing personal details
  // Simulated by logging a message to the console
  matchedDonors.forEach((donor) => {
    console.log(`Contact donor: ${donor.name} for blood donation.`);
  });

  // Simulating appointment scheduling for donors
  nearbyDonors.forEach((donor) => {
    console.log(
      `Donor ${donor.name} can schedule an appointment at the nearest authorized center.`
    );
  });
}

main().catch(console.error);
