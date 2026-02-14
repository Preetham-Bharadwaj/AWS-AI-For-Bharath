export default async function getNearbyHospitalsFree(lat, lng) {
  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:5000,${lat},${lng});
      way["amenity"="hospital"](around:5000,${lat},${lng});
      relation["amenity"="hospital"](around:5000,${lat},${lng});
    );
    out center;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  try {
    const res = await fetch(url, {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    return data.elements.map((place, index) => ({
      id: index,
      name: place.tags?.name || "Unknown Hospital",
      lat: place.lat || place.center?.lat,
      lng: place.lon || place.center?.lon,
      address: place.tags?.["addr:full"] || "Address not available",
      distance: "N/A",
      rating: 4.0, // default (OSM doesn't give ratings)
      reviews: 0,
      specializations: ["General Medicine"]
    }));

  } catch (err) {
    console.error(err);
    return [];
  }
}
