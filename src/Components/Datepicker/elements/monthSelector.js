import { useState } from "react";
import { times, identity } from "ramda";
import {
  addMonths,
  format,
  getMonth,
  setMonth,
  startOfYear,
} from "date-fns/fp";
import { ArrowDownIcon } from "../icons";
import './../../../App.css'
const noop = () => {};

export const MonthSelector = ({ month, onSelect = noop }) => {
  const formatter = format("MMM");
  const sy = startOfYear(month);
  const months = times(identity, 12).map((_, idx) => addMonths(idx, sy));
  
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(getMonth(month))
  const handleSelect = (e) => {
          onSelect(setMonth(parseInt(getMonth(e)), month))
          setValue(e)
  }
  const toggle = (e) => {
    setOpen(!open)
  }
  return (
    <>
      {/* <select
        className="dropdown"
        value={getMonth(month)}
        onChange={({ target: { value } }) =>
          onSelect(setMonth(parseInt(value), month))
        }
      >
        {months.map((x, idx) => (
          <option className="hello" key={idx} value={getMonth(x)}>
            {formatter(x)}
          </option>
        ))}
      </select>
      <div className="arrow" /> */}

      <div className="select-wrapper custom-select" onClick={toggle}>
      <span className="label">
        {formatter(value)}
        <span className="icon" open={open}>
          <ArrowDownIcon />
        </span>
      </span>
      <div className={`dropdown ${open && 'open' }`} >
        <div className="dropdownWrapper">
          {months.map((item, i)  => (
            <div className={`option ${formatter(value) === formatter(item) && "active"}`}
              key={`${i}`}
              onClick={() => handleSelect(item)}
              // onClick={(e) => {
              //   if (!item.readOnly) handleSelect(item)
              // }}
            >
              {formatter(item)}
            </div>
          ))}
        </div >
      </div>
    </div>
    </>
  );
};
