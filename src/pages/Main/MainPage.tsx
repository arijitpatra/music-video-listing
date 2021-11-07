import { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Search } from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";
import { TagFilter } from "../../components/TagFilter";
import Headroom from "react-headroom";
import "./MainPage.scss";
import {
  createIndexedGenreObjectMapping,
  getGenreNameFromGenreId,
  getAllReleaseYear,
  checkForIncludes
} from "../../utils";

interface IMusicVideoListing {
  genres?: IGenre[] | null;
  videos?: IVideos[] | null;
}

interface IGenre {
  id: number;
  name: string;
}

interface IVideos {
  id: number;
  artist: string;
  title: string | number;
  release_year: number;
  genre_id: number;
  image_url: string;
}

export const MainPage = () => {
  const [masterData, setMasterData] = useState({ videos: [], genres: [] });
  const [filteredData, setFilteredData] = useState<IVideos[]>([]);
  const [idGenreMapping, setIdGenreMapping] = useState();

  const manipulateData = useCallback((data: any) => {
    const { genres, videos } = data;
    setMasterData(data);
    setFilteredData(videos);
    setIdGenreMapping(createIndexedGenreObjectMapping(genres));
  }, []);

  const handleOnChange = useCallback(
    (e: any) => {
      const { value } = e.target;
      if (value) {
        let filteredDataLocal: IVideos[] = masterData.videos.filter(
          (i: IVideos) => {
            return (
              checkForIncludes(i.artist, value) || 
              checkForIncludes(i.title, value) || 
              checkForIncludes(getGenreNameFromGenreId(idGenreMapping, i.genre_id), value)
            );
          }
        );
        setFilteredData(filteredDataLocal);
      } else {
        setFilteredData(masterData.videos);
      }
    },
    [idGenreMapping, masterData.videos]
  );

  const handleOnChangeForReleaseYear = useCallback(
    (e: any, data: any) => {
      const { value } = data;
      if (["all", ""].includes(value)) {
        setFilteredData(masterData.videos);
      } else {
        let filteredDataLocal = filteredData.filter((i: IVideos) => {
          return i.release_year === value;
        });
        setFilteredData(filteredDataLocal);
      }
    },
    [filteredData, masterData.videos]
  );

  const handleOnChangeForGenreTags = useCallback(
    (e: any, data: any) => {
      const { value } = data;
      if (value.length > 0) {
        let filteredDataLocal = masterData.videos.filter((i: IVideos) => {
          const genreName = getGenreNameFromGenreId(idGenreMapping, i.genre_id);
          return value.includes(genreName);
        });
        setFilteredData(filteredDataLocal);
      } else {
        setFilteredData(masterData.videos);
      }
    },
    [idGenreMapping, masterData.videos]
  );

  const getHeader = () => {
    return (
      <Headroom>
        <div className="header d-f p-s fd-c">
          <h1>Music Video Listing</h1>
          {filteredData && (
            <Search
              onChange={handleOnChange}
              placeholder="Search artist, title, genre..."
            />
          )}
          <div className="moreFilters d-f">
            {filteredData && (
              <TagFilter
                data={masterData.genres.map((i: IGenre) => i.name)}
                placeholder="Select Genres"
                onChange={handleOnChangeForGenreTags}
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
      </Headroom>
    );
  };

  const generateCard = () =>
    filteredData.map((i: any) => (
      <Card
        key={i.id}
        image_url={i.image_url}
        artist={i.artist}
        title={i.title}
        genre={getGenreNameFromGenreId(idGenreMapping, i.genre_id)}
      />
    ));

  // Hook runs on component mount
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
    )
      .then((response) => response.json())
      .then((data) => manipulateData(data))
      .catch((e) => {});
    // TODO: handle failure cases here and then loader should stop and say the error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {getHeader()}
      <div className="card-container d-g jc-c">
        {filteredData && idGenreMapping
          ? generateCard()
          : "Getting the best music videos for you..."}
      </div>
    </>
  );
};
