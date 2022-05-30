import { DatePicker } from "./elements/datePicker";
import React, { useState } from "react";
import { addDays } from "date-fns/fp";
import '../../App.css'

export const Picker = () => {
  const today = new Date();
  const [sampleRange, setSampleRange] = useState([
    addDays(-5, today),
    addDays(-3, today),
  ]);
  return (
    <div>
      <DatePicker
        onChange={(x) => setSampleRange(x)}
        onSelect={(x) => console.log(x)}
        range={sampleRange}
      />
    </div>
  );
};
