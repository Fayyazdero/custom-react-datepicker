import { times, identity, splitEvery } from "ramda";
import {
  addYears,
  format,
  getYear,
  setYear,
} from "date-fns/fp";

import "./App.css";
const noop = () => {};

export const YearSelector = ({ year, onSelect = noop }) => {
    const fromYear = addYears(-4, year);
    const years = times(identity, 20).map((_, idx) => addYears(idx, fromYear));
  
    return (
      <>
      <select
        value={getYear(year)}
        onChange={({ target: { value } }) =>
          onSelect(setYear(parseInt(value), year))
        }
      >
        {years.map((y, idx) => (
          <option key={idx}>{format("yyyy", y)}</option>
        ))}
      </select>
          <div className="arrow"/>
  </>
    );
  };