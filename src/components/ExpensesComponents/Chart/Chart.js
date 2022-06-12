import React from "react";
import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  const dataPointsValues = props.dataPoints.map((dp) => {
    return dp.value;
  });

  const totalMaximum = dataPointsValues.reduce((acc, e) => (acc += e), 0);

  return (
    <div className="chart">
      {props.dataPoints.map((datapoint) => {
        return (
          <ChartBar
            key={datapoint.label}
            value={datapoint.value}
            maxValue={totalMaximum}
            label={datapoint.label}
          />
        );
      })}
    </div>
  );
};

export default Chart;
