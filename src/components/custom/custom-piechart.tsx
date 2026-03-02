/* eslint-disable @typescript-eslint/no-explicit-any */
import { valueFormatter } from "@/utils/chart";
import { PieChart } from "@mui/x-charts/PieChart";
interface CustomPieChartProps {
  data: any[];
}

export default function CustomPieChart({ data }: CustomPieChartProps) {
  {
    return (
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={200}
        width={200}
      />
    );
  }
}
