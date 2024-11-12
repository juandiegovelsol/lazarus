const fs = require("fs");
const path = require("path");

class AnimalProfileSerializer {
  constructor() {
    this.breedList = this.loadBreedList();
    this.vaccineTypes = this.loadVaccineTypes();
  }

  loadBreedList() {
    const breedData = fs.readFileSync(
      path.join(__dirname, "breeds.json"),
      "utf-8"
    );
    return JSON.parse(breedData);
  }

  loadVaccineTypes() {
    const vaccineData = fs.readFileSync(
      path.join(__dirname, "vaccineTypes.json"),
      "utf-8"
    );
    return JSON.parse(vaccineData);
  }

  validateAndSerialize(profile) {
    const errors = [];

    if (!/^[A-Z][a-z]*([ ][A-Z][a-z]*){0,49}$/.test(profile.name)) {
      errors.push(
        "Name must start with an uppercase letter and be 1-50 alphabetic characters."
      );
    }

    const ageMatch = profile.age.match(
      /^(1[0-9]|20|[1-9]) years( (1[0-1]|[1-9]) months)?$/
    );

    if (!ageMatch) {
      errors.push(
        "Age must be in format 'X years Y months' or 'X years' with valid ranges for X and Y."
      );
    }

    if (!this.breedList.includes(profile.breed)) {
      errors.push(
        `Breed must be one of the following: ${this.breedList.join(", ")}`
      );
    }

    if (!["Available", "Pending", "Adopted"].includes(profile.status)) {
      errors.push("Status must be 'Available', 'Pending', or 'Adopted'.");
    } else if (profile.status === "Pending") {
      if (
        !this.validateDate(profile.applicationDate) ||
        !this.isWithinLast30Days(profile.applicationDate)
      ) {
        errors.push(
          "If status is 'Pending', applicationDate must be in 'YYYY-MM-DD' format within the last 30 days."
        );
      }
    } else if (profile.status === "Adopted") {
      if (
        !profile.adoptionDate ||
        !this.is30DaysAfter(profile.applicationDate, profile.adoptionDate)
      ) {
        errors.push(
          "If status is 'Adopted', adoptionDate must be exactly 30 days after applicationDate."
        );
      }
    }

    const validHealthStatuses = [
      "Healthy",
      "Neutered",
      "Vaccinated",
      "Needs Medical Attention",
      "Special Needs",
    ];
    if (
      profile.healthStatus.some(
        (status) => !validHealthStatuses.includes(status)
      )
    ) {
      errors.push(
        `Health status must include only the following: ${validHealthStatuses.join(
          ", "
        )}`
      );
    }
    if (
      profile.healthStatus.includes("Special Needs") &&
      (!profile.needsDescription || profile.needsDescription.length < 50)
    ) {
      errors.push(
        "If 'Special Needs' is listed, needsDescription must contain at least 50 characters."
      );
    }

    for (let record of profile.vaccinationRecords || []) {
      if (!this.vaccineTypes.includes(record.type)) {
        errors.push(
          `Vaccine type '${
            record.type
          }' is not recognized. Must be one of: ${this.vaccineTypes.join(", ")}`
        );
      }
      if (
        !this.validateDate(record.dateAdministered) ||
        !this.validateDate(record.expirationDate)
      ) {
        errors.push("Vaccine dates must be in 'YYYY-MM-DD' format.");
      } else if (
        record.type === "Rabies" &&
        !this.isThreeYearsAfter(record.dateAdministered, record.expirationDate)
      ) {
        errors.push(
          "Rabies vaccine expiration date must be exactly 3 years after dateAdministered."
        );
      }
    }

    if (this.calculateMonths(profile.age) < 12) {
      profile.category = "Puppy/Kitten";
    }

    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join("; ")}`);
    }

    return JSON.stringify(profile);
  }

  validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }

  isWithinLast30Days(date) {
    const givenDate = new Date(date);
    const today = new Date();
    const diffInTime = today.getTime() - givenDate.getTime();
    return diffInTime <= 30 * 24 * 60 * 60 * 1000;
  }

  is30DaysAfter(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return endDate - startDate === 30 * 24 * 60 * 60 * 1000;
  }

  isThreeYearsAfter(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (
      endDate.getFullYear() === startDate.getFullYear() + 3 &&
      endDate.getMonth() === startDate.getMonth() &&
      endDate.getDate() === startDate.getDate()
    );
  }

  calculateMonths(ageStr) {
    const ageParts = ageStr.match(
      /(?<years>\d+) years(?: (?<months>\d+) months)?/
    );
    if (!ageParts) return 0;
    const years = parseInt(ageParts.groups.years, 10);
    const months = parseInt(ageParts.groups.months || "0", 10);
    return years * 12 + months;
  }
}

const serializer = new AnimalProfileSerializer();
try {
  const profiles = [
    {
      name: "Buddy",
      age: "3 years 6 months",
      breed: "Labrador",
      status: "Available",
      healthStatus: ["Healthy", "Vaccinated"],
      vaccinationRecords: [
        {
          type: "Rabies",
          dateAdministered: "2021-05-15",
          expirationDate: "2024-05-15",
        },
      ],
    },
    {
      name: "Maximus",
      age: "2 years",
      breed: "Labrador",
      status: "Pending",
      applicationDate: "2024-11-01",
      healthStatus: ["Neutered", "Healthy"],
      vaccinationRecords: [
        {
          type: "Distemper",
          dateAdministered: "2022-10-10",
          expirationDate: "2023-10-10",
        },
        {
          type: "Rabies",
          dateAdministered: "2021-01-15",
          expirationDate: "2024-01-15",
        },
      ],
    },
    {
      name: "Bella",
      age: "1 years 2 months",
      breed: "Beagle",
      status: "Adopted",
      applicationDate: "2023-09-01",
      adoptionDate: "2023-10-01",
      healthStatus: ["Healthy"],
      vaccinationRecords: [
        {
          type: "Bordetella",
          dateAdministered: "2023-05-20",
          expirationDate: "2024-05-20",
        },
      ],
    },
    {
      name: "Luna",
      age: "1 years 11 months",
      breed: "Poodle",
      status: "Adopted",
      applicationDate: "2023-09-01",
      adoptionDate: "2023-10-01",
      healthStatus: ["Healthy", "Special Needs"],
      needsDescription:
        "Needs a calm environment with minimal noise and activity. Luna gets anxious in busy or loud settings and requires a peaceful space to thrive.",
      vaccinationRecords: [
        {
          type: "Distemper",
          dateAdministered: "2023-04-15",
          expirationDate: "2024-04-15",
        },
      ],
    },
    {
      name: "Charlie",
      age: "5 years",
      breed: "German Shepherd",
      status: "Available",
      healthStatus: ["Neutered", "Healthy"],
      vaccinationRecords: [
        {
          type: "Rabies",
          dateAdministered: "2022-06-10",
          expirationDate: "2025-06-10",
        },
        {
          type: "Distemper",
          dateAdministered: "2023-02-01",
          expirationDate: "2024-02-01",
        },
      ],
    },
  ];

  const serializedProfiles = profiles.map((profile) =>
    serializer.validateAndSerialize(profile)
  );
  console.log(serializedProfiles);
} catch (error) {
  console.error(error.message);
}
