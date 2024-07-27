import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip } from "chart.js";
import React, { memo, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

import { AxiosAPI } from "../../assets/api.js";

ChartJS.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CharHomeItem = memo(({ id }) => {
   const [datas, setData] = useState(null);
   const { data, status } = AxiosAPI.useGetHomePage();
   const dataSelector = data?.data.items.find((e) => e.sectionType === "RTChart");

   useEffect(() => {
      if (data) {
         setData(dataSelector);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [status]);
   
   const getEnCodeId = (num) => datas?.items[`${num}`]?.encodeId;
   const data2 = {
      labels: datas?.chart?.times.map((e) => e.hour + ":00"),
      datasets: [
         {
            label: datas?.items[0]?.title,
            data: datas?.chart?.items[`${getEnCodeId(0)}`]?.map((e) => e.counter),
            borderColor: "#4A90E2",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#4A90E2",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            oder: 1,
            hoverRadius: 12,
            hoverBorderWidth: 3,
         },
         {
            label: datas?.items[1]?.title,
            data: datas?.chart?.items[`${getEnCodeId(1)}`]?.map((e) => e.counter),
            borderColor: "#27BD9C",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#27BD9C",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            hoverRadius: 12,
            oder: 2,
            hoverBorderWidth: 3,
         },
         {
            label: datas?.items[2]?.title,
            data: datas?.chart?.items[`${getEnCodeId(2)}`]?.map((e) => e.counter),
            borderColor: "#A64250",
            backgroundColor: "#fff",
            fill: false,
            tension: 0.5,
            borderWidth: 2,
            pointBorderWidth: 3,
            pointRadius: 3,
            pointHoverBackgroundColor: "#A64250",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5.5,
            hoverRadius: 12,
            oder: 3,
            hoverBorderWidth: 3,
         },
      ],
   };
   return <Chart
      id={id}
      updateMode="resize"
      type="line"
      options={{
         animations: {
            radius: {
               duration: 500,
               easing: "linear",
               loop: (context) => context.active,
            },
         },
         datasetStrokeWidth: 10,
         pointDotStrokeWidth: 10,
         tooltipFillColor: "rgb(0,0,0)",
         interaction: {
            mode: "index",
            intersect: false,
         },

         plugins: {
            legend: {
               display: false,
            },
         },
         responsive: true,
         tooltips: {
            enabled: true,
            mode: "x-axis",
            intersect: false,
            padding: 2,
            caretPadding: 4,
            usePointStyle: true,
         },
         hover: {
            mode: "dataset",
            intersect: false,
            includeInvisible: true,
         },
         scales: {
            y: {
               min: -100,
               max: `${datas?.chart?.maxScore}`,
               display: false,
            },
            x: {
               ticks: {
                  callback: function (val, index) {
                     return index % 2 === 0 ? this.getLabelForValue(val) : ""
                  },
                  padding: 0,
                  textStrokeColor: "#fff",
                  color: "#96979B",
               },
               alignToPixels: true,
            },
         },
      }}
      data={data2}
   />
});

export default CharHomeItem;
