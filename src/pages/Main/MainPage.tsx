import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
} from "react";
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
  checkForIncludes,
} from "../../utils";

interface IGenre {
  id: number;
  name: string;
}

interface IVideos {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
}

interface IReleaseYear {
  value: string | number;
}

interface IGenreTag {
  value: String[];
}

export const MainPage = () => {
  const [masterData, setMasterData] = useState({ videos: [], genres: [] });
  const [filteredData, setFilteredData] = useState<IVideos[]>([]);
  const [idGenreMapping, setIdGenreMapping] = useState();
  const [isError, setIsError] = useState(false);

  const manipulateData = useCallback((data: any) => {
    const { genres, videos } = data;
    setMasterData(data);
    setFilteredData(videos);
    setIdGenreMapping(createIndexedGenreObjectMapping(genres));
  }, []);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value) {
        let filteredDataLocal: IVideos[] = masterData.videos.filter(
          (i: IVideos) => {
            return (
              checkForIncludes(i.artist, value) ||
              checkForIncludes(i.title, value) ||
              checkForIncludes(
                getGenreNameFromGenreId(idGenreMapping, i.genre_id),
                value
              )
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
    (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
      const { value }: IReleaseYear = data;
      if (typeof value === "string") {
        setFilteredData(masterData.videos);
      } else {
        let filteredDataLocal = filteredData.filter((item: IVideos) => {
          return item.release_year === value;
        });
        setFilteredData(filteredDataLocal);
      }
    },
    [filteredData, masterData.videos]
  );

  const handleOnChangeForGenreTags = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
      const { value }: IGenreTag = data;
      console.log(typeof value);
      if (value.length > 0) {
        let filteredDataLocal = masterData.videos.filter((item: IVideos) => {
          const genreName = getGenreNameFromGenreId(
            idGenreMapping,
            item.genre_id
          );
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
      <Headroom data-testid="test-header">
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
                data={masterData.genres.map((item: IGenre) => item.name)}
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
    filteredData.map((item: IVideos) => (
      <Card
        key={item.id}
        image_url={item.image_url}
        artist={item.artist}
        title_label={item.title.toString()}
        genre={getGenreNameFromGenreId(idGenreMapping, item.genre_id)}
      />
    ));

  const getUserMessage = () => {
    return isError
      ? "Oops! Error fetching data, please retry..."
      : "Getting the best music videos for you...";
  };

  // runs on componentDidMount
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
    )
      .then((response) => response.json())
      .then((data) => manipulateData(data))
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {getHeader()}
      <div
        className="card-container d-g jc-c"
        data-testid="test-card-container"
      >
        {filteredData && idGenreMapping ? generateCard() : getUserMessage()}
      </div>
    </>
  );
};
