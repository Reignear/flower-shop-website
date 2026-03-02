import { LineChart } from "@mui/x-charts/LineChart";

interface CustomLineChartProps {
  data: number[];
  categories: string[];
}

export default function CustomLineChart({
  data,
  categories,
}: CustomLineChartProps) {
  return (
    <LineChart
      xAxis={[{ data: categories, scaleType: "point" }]}
      yAxis={[
        {
          valueFormatter: (value: number) => Math.round(value).toString(),
        },
      ]}
      series={[
        {
          data: data,
          area: true,
          showMark: ({ index }) => index % 2 === 0,
        },
      ]}
      height={300}
    />
  );
}
