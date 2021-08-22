import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function CommitMotivationChart() {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
            width: "50%",
        },
        xaxis: {
            categories: [1992, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
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
    return <Chart options={options} series={series} type="line" height="100%" />;
}
export default CommitMotivationChart;
