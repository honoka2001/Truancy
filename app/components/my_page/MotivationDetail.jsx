import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function MotivationDetail() {
    const [options, setOptions] = useState({
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
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart options={options} series={series} type="radar" width="500" />
                </div>
            </div>
        </div>
    );
}
export default MotivationDetail;
