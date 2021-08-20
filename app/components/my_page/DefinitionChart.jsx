import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function DefinitionChart() {
    const [options, setOptions] = useState({
        chart: {
            type: "pie",
        },
        labels: ["数学", "国語", "理科"],
    });
    const [series, setSeries] = useState([45, 52, 38]);
    return <Chart options={options} series={series} type="pie" width="100%" />;
}
export default DefinitionChart;
