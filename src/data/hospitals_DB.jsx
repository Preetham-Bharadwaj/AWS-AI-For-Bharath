// ─── Mock Hospital Data ──────────────────────────────────────────────────────
const MOCK_HOSPITALS = [
  {
    id: "h1", name: "Apollo Hospitals", address: "Bannerghatta Road, Bengaluru",
    lat: 12.8843, lng: 77.5975, rating: 4.7, reviews: 3240,
    distance: 1.2, type: "Multi-Specialty Hospital",
    specializations: ["Cardiology","General Medicine","Orthopedics","Neurology","Oncology"],
    openTime: "00:00", closeTime: "23:59",
    lunchBreak: { start: "13:00", end: "14:00" },
    teaBreak:   { start: "16:30", end: "16:50" },
    phone: "+91-80-2682-4444", emergency: true, beds: 400
  },
  {
    id: "h2", name: "Fortis Hospital", address: "Cunningham Road, Bengaluru",
    lat: 12.9942, lng: 77.5968, rating: 4.5, reviews: 2180,
    distance: 2.8, type: "Multi-Specialty Hospital",
    specializations: ["Dermatology","General Medicine","Pediatrics","ENT","Cardiology"],
    openTime: "08:00", closeTime: "22:00",
    lunchBreak: { start: "13:30", end: "14:30" },
    teaBreak:   { start: "17:00", end: "17:15" },
    phone: "+91-80-6621-4444", emergency: true, beds: 280
  },
  {
    id: "h3", name: "Manipal Hospital", address: "Old Airport Road, Bengaluru",
    lat: 12.9575, lng: 77.6478, rating: 4.6, reviews: 4100,
    distance: 3.5, type: "Super-Specialty Hospital",
    specializations: ["Neurology","Cardiology","Orthopedics","Gastroenterology","Urology"],
    openTime: "07:00", closeTime: "23:00",
    lunchBreak: { start: "13:00", end: "14:00" },
    teaBreak:   { start: "16:00", end: "16:20" },
    phone: "+91-80-2502-4444", emergency: true, beds: 600
  },
  {
    id: "h4", name: "Sakra World Hospital", address: "Marathahalli, Bengaluru",
    lat: 12.9591, lng: 77.6974, rating: 4.4, reviews: 1560,
    distance: 4.1, type: "Multi-Specialty Hospital",
    specializations: ["Orthopedics","Spine Surgery","General Medicine","Rheumatology"],
    openTime: "08:00", closeTime: "21:00",
    lunchBreak: { start: "14:00", end: "15:00" },
    teaBreak:   { start: "17:30", end: "17:45" },
    phone: "+91-80-4969-4444", emergency: false, beds: 200
  },
  {
    id: "h5", name: "Cloudnine Hospital", address: "JP Nagar, Bengaluru",
    lat: 12.9079, lng: 77.5920, rating: 4.8, reviews: 2890,
    distance: 5.3, type: "Specialty Hospital",
    specializations: ["Obstetrics","Gynecology","Pediatrics","Neonatology"],
    openTime: "00:00", closeTime: "23:59",
    lunchBreak: null, teaBreak: null,
    phone: "+91-80-6726-4444", emergency: true, beds: 150
  },
  {
    id: "h6", name: "Vikram Hospital", address: "Millers Road, Bengaluru",
    lat: 12.9924, lng: 77.5826, rating: 4.3, reviews: 980,
    distance: 6.8, type: "General Hospital",
    specializations: ["General Medicine","Surgery","ENT","Ophthalmology","Dermatology"],
    openTime: "09:00", closeTime: "20:00",
    lunchBreak: { start: "13:00", end: "14:00" },
    teaBreak:   { start: "16:00", end: "16:15" },
    phone: "+91-80-2345-6789", emergency: false, beds: 120
  }
];

export default MOCK_HOSPITALS;
