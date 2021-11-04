import "./Search.scss";

export const Search = ({ onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search artist, title, genre..."
      onChange={onChange}
    />
  );
};
