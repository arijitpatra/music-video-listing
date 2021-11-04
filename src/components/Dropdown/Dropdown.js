import "./Dropdown.scss";
import { Dropdown as DropdownSemantic } from "semantic-ui-react";

// TODO : move to a higher level utils
const makeDataChronological = (data) => {
  return data.sort();
};

export const Dropdown = ({ placeholder, data, onChange }) => {
  const stateOptions = makeDataChronological(data).map((i) => ({
    key: i,
    text: i,
    value: i,
  }));

  return (
    <DropdownSemantic
      placeholder={placeholder}
      //fluid
      //multiple
      //search
      selection
      options={stateOptions}
      onChange={onChange}
      clearable
    />
    // <select name="cars" id="cars" onChange={onChange}>
    //   <option value="" disabled selected hidden>
    //     {placeholder}
    //   </option>
    //   <option value="all" key="all">
    //     All
    //   </option>
    //   {makeDataChronological(data).map((i) => (
    //     <option value={i} key={i}>
    //       {i}
    //     </option>
    //   ))}
    // </select>
  );
};
