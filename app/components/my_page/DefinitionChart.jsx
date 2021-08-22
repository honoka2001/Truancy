import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function DefinitionChart(props) {
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
    },
    labels: ["数学", "国語", "理科"],
    // labels: props.week_definition_names,
  });
  const [series, setSeries] = useState([45, 52, 38]);
  //   const [series, setSeries] = useState(props.week_definition_sum);

  useEffect(() => {
    if (props.week_definition_names) {
    setOptions({
      labels: props.week_definition_names,
    });
    }
    setSeries(props.week_definition_sum);
  }, [props.week_definition_names]);

  return (
    <div>
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
}
export default DefinitionChart;
