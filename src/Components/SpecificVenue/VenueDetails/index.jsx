import HeadLine from "../../HeroSection/Headline";
import AmenitiesList from "../AmenitiesList";
import propTypes from "prop-types";

function VenueDetails({ venue }) {
  return (
    <>
      <p>{venue?.data?.description}</p>
      <HeadLine level={4} className="text-black fw-semibold" text="Amenities" />
      <AmenitiesList amenities={venue?.data?.meta} />
      <p>
        {venue?.data?.location.city || venue?.data?.location?.country
          ? `Location: ${venue?.data?.location.city}, ${venue?.data?.location?.country}`
          : ""}
      </p>
      <p>Max total guests: {venue?.data?.maxGuests}</p>
      <p>${venue?.data?.price}/night</p>
    </>
  );
}

VenueDetails.propTypes = {
  venue: propTypes.object,
};

export default VenueDetails;
