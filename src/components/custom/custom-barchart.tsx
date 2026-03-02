import { BarChart } from "@mui/x-charts/BarChart";

interface CustomBarChartProps {
  data: number[];
  categories: string[];
  yAxisLabel?: string;
  height?: number;
  yAxisWidth?: number;
  color?: string;
}

export default function CustomBarChart({
  data,
  categories,
  yAxisLabel = "Customer Growth",
  height = 300,
  yAxisWidth = 60,
  color = "#2179FD",
}: CustomBarChartProps) {
  const chartSetting = {
    yAxis: [
      {
        label: yAxisLabel,
        width: yAxisWidth,
      },
    ],
    height,
  };

  return (
    <div>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: categories,
            height: 28,
          },
        ]}
        series={[
          {
            data: data,
            color: color,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
