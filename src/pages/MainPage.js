import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import "./MainPage.scss";

export const MainPage = () => {
  const [masterData, setMasterData] = useState();

  const manipulateData = (data) => {
    const { genres, videos } = data;
    console.log(genres);
    console.log(videos);

    setMasterData(data);
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
    )
      .then((response) => response.json())
      .then((data) => manipulateData(data));
  }, []);

  return (
    <div className="container">
      {masterData
        ? masterData.videos.map((i) => (
            <Card
              key={i.id}
              image_url={i.image_url}
              artist={i.artist}
              title={i.title}
            />
          ))
        : "Loading"}
    </div>
  );
};
