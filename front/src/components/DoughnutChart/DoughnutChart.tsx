import React from "react";

import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
export type DoughnutChartData = ChartData<"doughnut">;
export type DoughnutChartOptions = ChartOptions<"doughnut">;
export type DoughnutChartDataset = ChartDataset<"doughnut">;

export type DoughnutChartProps = {
  data: DoughnutChartData;
  options?: DoughnutChartOptions;
};

ChartJS.register(ArcElement);
const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  options = {
    responsive: false,
    maintainAspectRatio: false,
  },
}) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
