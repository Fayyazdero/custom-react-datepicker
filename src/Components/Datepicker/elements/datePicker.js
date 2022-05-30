import React, {useState} from "react";
import { useCallback, useState } from "react";
import {
  addDays,
  addMonths,
  
} from "date-fns/fp";
import arrow_right from "./assests/left-chevron.png";
import arrow_left from "./assests/chevron.png";

export const DatePicker = ({
    onChange = noop,
    onSelect = noop,
    range,
    selected: initialSelected = new Date(),
  }) => {
    const [selected, setSelected] = useState(initialSelected);
    const [focused, setFocused] = useState(null);
    const [monthView, setMonthView] = useState(initialSelected);
    const [[start, end], setRange] = useState([null, null]);
  
    const nextMonth = addMonths(1, monthView);
  
    const handleSelect = useCallback(
      (x) => {
        if (!end) {
          const min = Math.min();
          const sorted = [start, x]
            .slice()
            .sort((a, b) => (a?.getTime() ?? min) - (b?.getTime() ?? min));
          setRange(sorted);
          onChange(sorted);
        } else {
          setRange([x, null]);
        }
        setSelected(x);
        onSelect(x);
      },
      [start, end, onChange, onSelect]
    );
  
    const increment = (x) => () => setMonthView((prev) => addMonths(x, prev));
    const handleKeyPress = ({ key }) => {
      const daysToAdd = keyMap[key];
      if (focused && daysToAdd) {
        setFocused(addDays(daysToAdd, focused));
      }
    };
  
    return (
      <div className="datepicker" onKeyDown={handleKeyPress}>
        <div className="months-wrapper">
          <Month
            focused={focused}
            month={monthView}
            onDayFocus={setFocused}
            onSelect={handleSelect}
            range={range}
            selected={selected}
            customHeader={
              <div className="controls">
                <button onClick={increment(-1)}>
                  {" "}
                  <img className="arrow_icons" src={arrow_right} />
                </button>
  
                <MonthSelector month={monthView} onSelect={setMonthView} />
                <YearSelector year={monthView} onSelect={setMonthView} />
                <button onClick={increment(1)}>
                  {" "}
                  <img className="arrow_icons" src={arrow_left} />{" "}
                </button>
              </div>
            }
          />
          <Month
            focused={focused}
            month={nextMonth}
            onDayFocus={setFocused}
            onSelect={handleSelect}
            range={range}
            selected={selected}
            customHeader={
              <div className="controls">
                <button onClick={increment(-1)}>
                  {" "}
                  <img className="arrow_icons" src={arrow_right} />
                </button>
  
                <MonthSelector month={monthView} onSelect={setMonthView} />
                <YearSelector year={monthView} onSelect={setMonthView} />
                <button onClick={increment(1)}>
                  {" "}
                  <img className="arrow_icons" src={arrow_left} />{" "}
                </button>
              </div>
            }
          />
        </div>
        {/* <div className="controls"> */}
        {/* <button onClick={() => setMonthView(new Date())}>today</button> */}
        {/* </div> */}
      </div>
    );
  };