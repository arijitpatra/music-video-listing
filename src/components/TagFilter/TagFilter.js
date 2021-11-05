import "./TagFilter.scss";
import { Dropdown as DropdownSemantic } from "semantic-ui-react";

// TODO : move to a higher level utils
const makeDataChronological = (data) => {
  return data.sort();
};

export const TagFilter = ({ placeholder, data, onChange }) => {
  const stateOptions = makeDataChronological(data).map((i) => ({
    key: i,
    text: i,
    value: i,
  }));

  return (
    <DropdownSemantic
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={[
        // {
        //   key: "all",
        //   text: "All",
        //   value: "all",
        // },
        ...stateOptions,
      ]}
      onChange={onChange}
      clearable
    />
  );
};
