import { useEffect, useRef } from "react";
import cx from "classnames";
import {
  format,
  isSameDay,
  isSameMonth,
  isWeekend,
  isWithinInterval,
} from "date-fns/fp";


export const Day = ({
    value,
    month,
    onSelect: onChange,
    range: [start, end],
    selected,
    onDayFocus,
    focused,
  }) => {
    const today = isSameDay(value, new Date());
    const grayout = !isSameMonth(value, month);
    const weekend = isWeekend(value);
    const inRange = start && end && isWithinInterval({ start, end }, value);
    const isSelected = selected && isSameDay(selected, value);
    const handleKeyDown = ({ key }) => {
      switch (key) {
        case "Enter":
        case " ":
          onChange(value);
          break;
        default:
          break;
      }
    };
    const ref = useRef(null);
  
    useEffect(() => {
      if (
        focused &&
        ref.current &&
        isSameDay(focused, value) &&
        !grayout &&
        document.activeElement !== ref.current
      ) {
        ref.current.focus();
      }
    }, [value, focused, grayout]);
    const first = start && isSameDay(start, value);
    const last = end && isSameDay(end, value);
  console.log({first, last})
    return (
      <div className={cx("days-parent", {
        first,
        last
      })}>

      <p
        role="button"
        tabIndex={0}
        ref={ref}
        className={cx("day", {
          today,
          grayout,
          weekend,
          selected: isSelected,
          "in-range": inRange,
          first,
          last
        })}
        onFocus={() => onDayFocus(value)}
        onKeyDown={handleKeyDown}
        onClick={() => onChange(value)}
      >
        {format("d", value)}
      </p>
        </div>
    );
  };