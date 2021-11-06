import { FC, SyntheticEvent } from "react";
import { Dropdown as DropdownSemantic, DropdownProps } from "semantic-ui-react";
import "./Dropdown.scss";

interface IDropDownProps {
  placeholder: string;
  data: any;
  onChange: (
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

// TODO : move to a higher level utils
const makeDataChronological = (data: any) => {
  return data.sort();
};

export const Dropdown: FC<IDropDownProps> = ({
  placeholder,
  data,
  onChange,
}) => {
  const stateOptions = makeDataChronological(data).map(
    (i: string | number) => ({
      key: i,
      text: i,
      value: i,
    })
  );

  return (
    <DropdownSemantic
      placeholder={placeholder}
      fluid
      selection
      options={[
        {
          key: "all",
          text: "All",
          value: "all",
        },
        ...stateOptions,
      ]}
      onChange={onChange}
      clearable
    />
  );
};
