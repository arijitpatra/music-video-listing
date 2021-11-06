import { FC, ChangeEvent } from "react";
import "./Search.scss";

interface ISearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Search: FC<ISearchProps> = ({ onChange, placeholder }) => {
  return <input type="text" placeholder={placeholder} onChange={onChange} />;
};
