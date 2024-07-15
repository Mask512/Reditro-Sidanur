import { Cell, LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Pasien } from '@/data/api/pasien';
import {
  generateBloodTypeData,
  generateBloodTypeStatistics,
} from '@/data/chart/golonganDarahChart';

const COLORS = [
  `hsl(12, 76%, 61%)`,
  `hsl(173, 58%, 39%)`,
  `hsl(197, 37%, 24%)`,
  `hsl(43, 74%, 66%)`,
  `hsl(27, 87%, 67%)`,
  `hsl(112, 60%, 50%)`,
  `hsl(245, 50%, 40%)`,
  `hsl(330, 45%, 35%)`,
  `hsl(60, 70%, 60%)`,
  `hsl(150, 80%, 70%)`,
];

export function ChartGolonganDarah() {
  const [chartConfig, setChartConfig] = useState<
    Record<string, { label: string }>
  >({});
  const [chartData, setchartData] = useState([
    { golonganDarah: 'O', pasien: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Pasien.getPasiens();
      const config = generateBloodTypeData(data);
      const generatedData = generateBloodTypeStatistics(data);

      setChartConfig(config);
      setchartData(generatedData);
    };
    fetchData();
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Golongan Darah</CardTitle>
        <CardDescription>Kategori berdasarkan total pasien</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent nameKey="golonganDarah" hideLabel />
              }
            />
            <Pie data={chartData} dataKey="pasien" label>
              <LabelList
                dataKey="golonganDarah"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
