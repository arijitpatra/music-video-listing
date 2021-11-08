import { FC, SyntheticEvent } from "react";
import { Dropdown as DropdownSemantic, DropdownProps } from "semantic-ui-react";
import { makeStateOptions } from "../../utils";
import "./Dropdown.scss";

interface IDropDownProps {
  placeholder: string;
  data: number[];
  onChange: (
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

export const Dropdown: FC<IDropDownProps> = ({
  placeholder,
  data,
  onChange,
}) => {
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
        ...makeStateOptions(data),
      ]}
      onChange={onChange}
      clearable
      data-testid="test-dropdown"
    />
  );
};
