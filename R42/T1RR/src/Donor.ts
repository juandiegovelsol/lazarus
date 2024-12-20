export interface Donor {
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
