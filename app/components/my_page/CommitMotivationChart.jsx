import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function CommitMotivationChart(props) {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
            // width: "50%",
            zoom: {
                enabled: false,
            },
        },
        fill: {
            opacity: [0.1, 1],
        },

        stroke: {
            width: 3,
            curve: "smooth",
        },

        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [1992, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        yaxis: [
            {
                title: {
                    text: "モチベーション率(%)",
                },
            },
            {
                opposite: true,
                title: {
                    text: "コミット数(commits)",
                },
            },
        ],
    });
    const [series, setSeries] = useState([
        {
            name: "モチベーション率",
            //   data: props.week_motivation_per,
            data: [30, 40, 45, 50, 49, 60, 70, 91],
            type: "area",
        },
        {
            name: "コミット数",
            //   data: props.week_daily_total_commits,
            data: [20, 30, 35, 40, 39, 50, 60, 81],
            type: "line",
        },
    ]);
    useEffect(() => {
        setOptions({
            xaxis: {
                categories: props.week_date,
            },
        });

        setSeries([
            {
                name: "モチベーション率",
                data: props.week_motivation_per,
                type: "area",
            },
            {
                name: "コミット数",
                data: props.week_daily_total_commits,
                type: "line",
            },
        ]);
    }, [props.week_date]);

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="line"
                height="130%"
            />
            ;
        </div>
    );
}
export default CommitMotivationChart;
