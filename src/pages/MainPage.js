import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Search } from "../components/Search";
import "./MainPage.scss";

export const MainPage = () => {
  const [masterData, setMasterData] = useState();
  const [filteredData, setFilteredData] = useState();

  const manipulateData = (data) => {
    const { genres, videos } = data;
    console.log(genres);
    console.log(videos);

    setMasterData(data);
    setFilteredData(videos);
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    if (value) {
      let filteredDataLocal = masterData.videos.filter((i) => {
        console.log(i);
        return (
          i.artist.toString().toLowerCase().includes(value.toLowerCase()) ||
          i.title.toString().toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredData(filteredDataLocal);
    } else {
      setFilteredData(masterData.videos);
    }
  };

  const generateCard = () =>
    filteredData.map((i) => (
      <Card
        key={i.id}
        image_url={i.image_url}
        artist={i.artist}
        title={i.title}
      />
    ));

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
    )
      .then((response) => response.json())
      .then((data) => manipulateData(data));
  }, []);

  return (
    <>
      <div className="header">
        <h1>XITE TV - Music Video Listing</h1>
        <Search onChange={handleOnChange} />
      </div>
      <div className="container">
        {filteredData
          ? generateCard()
          : "Getting the best music videos for you..."}
      </div>
    </>
  );
};
