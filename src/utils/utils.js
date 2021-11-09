// API for data
export const apiUrl =
  "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

// This function returns an unique array
export const makeUniqueArray = (data) => {
  return [...new Set(data)];
};

// This function makes an array of all unique release years
export const getAllReleaseYear = (data) => {
  return makeUniqueArray(data.map((item) => item.release_year));
};

// This function checks if a string has substring
export const checkForIncludes = (a, b) =>
  a.toString().toLowerCase().includes(b.toLowerCase());

// This function returns a sorted array
export const sortData = (data) => {
  return data.sort();
};

// Thi sfunction creates the options input for Dropdown/TagFilter components
export const makeStateOptions = (data) =>
  sortData(data).map((item) => ({
    key: item,
    text: item,
    value: item,
  }));

// This function will create a mapping with object index being the genreid and it will have name property which is the name of the genre
export const createIndexedGenreObjectMapping = (genres) =>
  genres.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: {
        name: item.name,
      },
    };
  }, {});

// This function gives us the genre name from the genre id and in case the genre id doesn't match we take the 'Other/Non-Music' genre having id 168
export const getGenreNameFromGenreId = (data, id) => {
  const keys = Object.keys(data);
  if (keys.includes(id.toString())) {
    return data[id].name;
  } else {
    return data[168].name; // 168 is for others
  }
};
