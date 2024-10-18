/* eslint-disable no-unused-vars */
function AmenitiesList(amenities) {
  const availableAmenities = Object.entries(amenities.amenities)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);
  return (
    <ul className="">
      {" "}
      {availableAmenities.length > 0 ? (
        availableAmenities.map((amenity) => <li key={amenity}>{amenity}</li>)
      ) : (
        <li>No amenities available yet</li>
      )}
    </ul>
  );
}

export default AmenitiesList;
