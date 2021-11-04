import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Search } from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";
import "./MainPage.scss";
import {
  createIndexedGenreObjectMapping,
  getGenreNameFromGenreId,
  getAllReleaseYear,
} from "./utils";

export const MainPage = () => {
  const [masterData, setMasterData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [idGenreMapping, setIdGenreMapping] = useState(); // make a normal const and put outside the function

  const manipulateData = (data) => {
    const { genres, videos } = data;
    console.log(genres);
    console.log(videos);
    setMasterData(data);
    setFilteredData(videos);

    setIdGenreMapping(createIndexedGenreObjectMapping(genres));
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (value) {
      let filteredDataLocal = masterData.videos.filter((i) => {
        return (
          i.artist.toString().toLowerCase().includes(value.toLowerCase()) ||
          i.title.toString().toLowerCase().includes(value.toLowerCase()) ||
          getGenreNameFromGenreId(idGenreMapping, i.genre_id)
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      });
      setFilteredData(filteredDataLocal);
    } else {
      setFilteredData(masterData.videos);
    }
  };

  const handleOnChangeForReleaseYear = (e, data) => {
    console.log(data);
    // const { value } = e.target;
    // if (value === "all") {
    //   setFilteredData(masterData.videos);
    // } else {
    //   let filteredDataLocal = filteredData.filter((i) => {
    //     return i.release_year.toString() === value;
    //   });
    //   setFilteredData(filteredDataLocal);
    // }
  };

  const generateCard = () =>
    filteredData.map((i) => (
      <Card
        key={i.id}
        image_url={i.image_url}
        artist={i.artist}
        title={i.title}
        genre={getGenreNameFromGenreId(idGenreMapping, i.genre_id)}
      />
    ));

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
    )
      .then((response) => response.json())
      .then((data) => manipulateData(data));
    // TODO: handle failure cases here and then loader should stop and say the error
  }, []);

  return (
    <>
      <div className="header">
        <h1>XITE TV - Music Video Listing</h1>
        <Search onChange={handleOnChange} />
        <div>
          {filteredData && (
            <Dropdown
              data={getAllReleaseYear(filteredData)}
              placeholder="Select Year"
              onChange={handleOnChangeForReleaseYear}
            />
          )}
          {filteredData && (
            <Dropdown
              data={getAllReleaseYear(filteredData)}
              placeholder="Select Year"
              onChange={handleOnChangeForReleaseYear}
            />
          )}
        </div>
      </div>
      <div className="container">
        {filteredData && idGenreMapping
          ? generateCard()
          : "Getting the best music videos for you..."}
      </div>
    </>
  );
};
