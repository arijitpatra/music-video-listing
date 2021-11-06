import { FC, SyntheticEvent } from "react";
import { Dropdown as DropdownSemantic, DropdownProps } from "semantic-ui-react";
import { makeStateOptions } from "../../utils";
import "./TagFilter.scss";

interface ITagFilterProps {
  placeholder: string;
  data: any;
  onChange: (
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

export const TagFilter: FC<ITagFilterProps> = ({
  placeholder,
  data,
  onChange,
}) => {
  return (
    <DropdownSemantic
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={[...makeStateOptions(data)]}
      onChange={onChange}
      clearable
    />
  );
};
