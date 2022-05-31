import { useState } from "react";
import { times, identity } from "ramda";
import { addYears, format, getYear, setYear } from "date-fns/fp";
import { ArrowDownIcon } from "../icons";

const noop = () => {};
const formatter = format("yyyy");
export const YearSelector = ({ year, onSelect = noop }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(formatter(getYear(year)));
  const handleSelect = (e) => {
    onSelect(setYear(parseInt(getYear(e)), year));
    setValue(formatter(e));
  };
  const toggle = (e) => {
    setOpen(!open);
  };
  const fromYear = addYears(-4, year);
  const years = times(identity, 20).map((_, idx) => addYears(idx, fromYear));
  console.log(years, "ss");
  return (
    <>
      <div className="select-wrapper custom-select" onClick={toggle}>
        <span className="label">
          {value}
          <span className="icon" open={open}>
            <ArrowDownIcon />
          </span>
        </span>
        <div className={`dropdown ${open && "open"}`}>
          <div className="dropdownWrapper">
            {years.map((item, i) => {
              return (
                <div
                  className={`option ${value === item && "active"}`}
                  key={`${i}`}
                  onClick={() => handleSelect(item)}
                >
                  {format("yyyy", item)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
