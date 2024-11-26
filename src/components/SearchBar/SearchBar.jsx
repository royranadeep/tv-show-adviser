import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
export function SearchBar({ onSubmit }) {
  function keyUpEvent(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onSubmit(e.target.value);
    }
  }
  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={keyUpEvent}
        className={s.input}
        type="text"
        placeholder={"Search a tv show you may like"}
      />
    </>
  );
}
