import { times, identity } from "ramda";
import {
  addMonths,
  format,
  getMonth,
  setMonth,
  startOfYear,
} from "date-fns/fp";

const noop = () => {};

export const MonthSelector = ({ month, onSelect = noop }) => {
    const sy = startOfYear(month);
    const formatter = format("MMM");
    const months = times(identity, 12).map((_, idx) => addMonths(idx, sy));
    return (
      <>
      <select className="dropdown"
        value={getMonth(month) + "&#x2304; dkjfnjkd"}
        onChange={({ target: { value } }) =>
        onSelect(setMonth(parseInt(value), month))
        }
      >
        {months.map((x, idx) => (
          <option key={idx} value={getMonth(x)}>
            {formatter(x)}
          </option>
          
          ))}
        
      </select>
      <div className="arrow"/>
      
  
          </>
    );
  };