import { Icon } from "semantic-ui-react";
import "./Search.scss";

export const Search = ({ onChange, placeholder }) => {
  return <input type="text" placeholder={placeholder} onChange={onChange} />;
};
