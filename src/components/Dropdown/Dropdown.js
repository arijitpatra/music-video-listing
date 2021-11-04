import "./Dropdown.scss";

// TODO : move to a higher level utils
const makeDataChronological = (data) => {
  return data.sort();
};

export const Dropdown = ({ placeholder, data, onChange }) => {
  return (
    <select name="cars" id="cars" onChange={onChange}>
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      <option value="all" key="all">
        All
      </option>
      {makeDataChronological(data).map((i) => (
        <option value={i} key={i}>
          {i}
        </option>
      ))}
    </select>
  );
};
