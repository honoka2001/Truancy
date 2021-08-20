import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function MotivationDetail() {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
        },
        labels: ["P", "I", "D"],
        fill: {
            opacity: 0.5,
            colors: ["#555555"],
        },
    });
    const [series, setSeries] = useState([
        {
            name: "Radar Series 1",
            data: [45, 52, 38],
        },
    ]);
    return <Chart options={options} series={series} type="radar" height="50%" />;
}
export default MotivationDetail;
