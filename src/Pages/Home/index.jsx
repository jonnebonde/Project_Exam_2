import { base_Url } from "../../Constants/API";
import { useInfiniteQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import HeroSection from "../../Components/HeroSection";
import { useState, useEffect } from "react";
import VenueCards from "../../Components/VenuesCards";
import HeadLine from "../../Components/HeroSection/Headline";
import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Shared/Loader";
import Button from "react-bootstrap/Button";

function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const limit = 10;

  // I used the docs from tanstack query and chatGPT to make this work for infinite scrolling and searching
  const fetchVenues = async ({ pageParam = 1 }) => {
    const url = search
      ? `${base_Url}holidaze/venues/search?q=${encodeURIComponent(search)}&limit=${limit}&page=${pageParam}&sortOrder=asc`
      : `${base_Url}holidaze/venues?_owner=true&_bookings=true&sortOrder=asc&limit=${limit}&page=${pageParam}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["venues", search],
      queryFn: fetchVenues,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage || undefined,
    });

  const handleSearch = () => {
    setSearch(inputSearch);
  };

  const resetSearch = () => {
    setInputSearch("");
    setSearch("");
  };

  useEffect(() => {
    if (inputSearch === "") {
      resetSearch();
    }
  }, [inputSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasNextPage &&
        !isFetching
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetching]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        An error has occurred, please try again.
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home | Holidaze</title>
        <meta
          name="description"
          content="Discover top-rated venues for any occasion."
        />
      </Helmet>
      <HeroSection
        inputSearch={inputSearch}
        resetSearch={resetSearch}
        handleSearch={handleSearch}
        setInputSearch={setInputSearch}
      />
      <HeadLine
        level={1}
        text="Explore our venues"
        className="text-center fw-bold mb-4"
      />
      <Container>
        {data.pages.flatMap((page) => page.data).length === 0 ? (
          <p className="text-center">No venues matched your search.</p>
        ) : (
          <VenueCards data={data.pages.flatMap((page) => page.data)} />
        )}
      </Container>
      {isFetching && <Loader />}

      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
          variant="primary"
        >
          Go to Top
        </Button>
      )}
    </>
  );
}

export default Home;
