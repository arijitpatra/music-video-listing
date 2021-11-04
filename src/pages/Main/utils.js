// This function will create a mapping with object index being the genreid and it will have name property which is the name of the genre
export const createIndexedGenreObjectMapping = (genres) =>
  genres.reduce((a, i) => {
    return {
      ...a,
      [i.id]: {
        name: i.name,
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
