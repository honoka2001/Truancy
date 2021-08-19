import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function CommitMotivationChart() {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
            width: 400,
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        yaxis: [
            {
                title: {
                    text: "Series A",
                },
            },
            {
                opposite: true,
                title: {
                    text: "Series B",
                },
            },
        ],
    });
    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
            name: "series-2",
            data: [20, 30, 35, 40, 39, 50, 60, 81],
        },
    ]);
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart options={options} series={series} type="line" width="500" />
                </div>
            </div>
        </div>
    );
}
export default CommitMotivationChart;
