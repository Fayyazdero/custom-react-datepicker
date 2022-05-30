import { times, identity, splitEvery } from "ramda";
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns/fp";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/startOfWeek";
import { Day } from "./day";


const WEEK_STARTS_ON = 1;

export const Month = ({
    month,
    onSelect: onChange,
    range,
    selected,
    customHeader,
    onDayFocus,
    focused,
  }) => {
    const sm = startOfMonth(month);
    const sfw = startOfWeek(sm, { weekStartsOn: WEEK_STARTS_ON });
    const em = endOfMonth(sm);
    const elw = endOfWeek(em, {
      weekStartsOn: WEEK_STARTS_ON,
    });
    const totalDays = differenceInCalendarDays(sfw, elw) + 1;
    const days = times(identity, totalDays).map((_, idx) => addDays(idx, sfw));
  
    return (
      <div className="month-wrapper">
        <div className="month-title">
          {customHeader ? customHeader : format("MMM", sm)}
        </div>
        <div className="weekNames">
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
          <div>Su</div>
        </div>
        <div className="month">
          {splitEvery(7, days).map((week, weekIdx) => {
            return (
              <div className="week" key={weekIdx}>
                {week.map((x,i) => (
                  <Day
                    value={x}
                    month={month}
                    key={x.getTime()}
                    onSelect={onChange}
                    range={range}
                    selected={selected}
                    focused={focused}
                    onDayFocus={onDayFocus}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };