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
  
  const donors: Donor[] = require('./data.json');
  
  const donorListElement = document.getElementById('donor-list');
  const searchFormElement = document.getElementById('search-form');
  const contactFormElement = document.getElementById('contact-form');
  
  const renderDonorList = () => {
    donorListElement.innerHTML = '';
    donors.forEach((donor) => {
      const donorElement = document.createElement('div');
      donorElement.innerHTML = `
        <h2>${donor.name}</h2>
        <p>Blood Type: ${donor.bloodType}</p>
        <p>Location: ${donor.location.city}, ${donor.location.state}</p>
      `;
      donorListElement.appendChild(donorElement);
    });
  };
  
  const handleSearch = (event: Event) => {
    event.preventDefault();
    const bloodType = (document.getElementById('blood-type') as HTMLSelectElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const filteredDonors = donors.filter((donor) => {
      return donor.bloodType === bloodType && donor.location.city.toLowerCase().includes(location.toLowerCase());
    });
    donorListElement.innerHTML = '';
    filteredDonors.forEach((donor) => {
      const donorElement = document.createElement('div');
      donorElement.innerHTML = `
        <h2>${donor.name}</h2>
        <p>Blood Type: ${donor.bloodType}</p>
        <p>Location: ${donor.location.city}, ${donor.location.state}</p>
      `;
      donorListElement.appendChild(donorElement);
    });
  };
  
  const handleContact = (event: Event) => {
    event.preventDefault();
    const donorId = parseInt((document.getElementById('donor-id') as HTMLInputElement).value);
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;
    const donor = donors.find((donor) => donor.id === donorId);
    if (donor) {
      // Send message to donor ( implementation depends on the messaging system used )
      console.log(`Message sent to ${donor.name}: ${message}`);
    } else {
      console.log('Donor not found');
    }
  };
  
  renderDonorList();
  
  searchFormElement.addEventListener('submit', handleSearch);
  contactFormElement.addEventListener('submit', handleContact);