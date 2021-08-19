import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function DefinitionChart() {
    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ["数学", "国語", "理科"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    });
    const [series, setSeries] = useState([45, 52, 38]);
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart options={options} series={series} type="pie" width="500" />
                </div>
            </div>
        </div>
    );
}
export default DefinitionChart;
