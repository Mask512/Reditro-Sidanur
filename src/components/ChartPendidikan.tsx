// import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pasien } from '@/data/api/pasien';
import { useEffect, useState } from 'react';
import { countPatientsByEducation } from '@/data/chart/pendidikanChart';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  pasien: {
    label: 'Pasien',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ChartPendidikan() {
  const [chartData, setChartData] = useState([{ pendidikan: 'SD', pasien: 0 }]);
  const [totalPasien, setTotalPasien] = useState(0);
  const [mostCommonEducation, setMostCommonEducation] = useState('');
  const [mostCommonEducationCount, setMostCommonEducationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Pasien.getPasiens();
      if (data) {
        setTotalPasien(data.length);
        const transformedData = countPatientsByEducation(data);
        setChartData(transformedData);

        let maxPatients = 0;
        let mostEducation = '';
        transformedData.forEach((item) => {
          if (item.pasien > maxPatients) {
            maxPatients = item.pasien;
            mostEducation = item.pendidikan;
          }
        });
        setMostCommonEducation(mostEducation);
        setMostCommonEducationCount(maxPatients);
      }
    };
    fetchData();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendidikan</CardTitle>
        <CardDescription>Kategori berdasarkan total pasien</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="pendidikan"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="pasien" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="pasien"
              layout="vertical"
              fill="var(--color-pasien)"
              radius={4}
            >
              <LabelList
                dataKey="pendidikan"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="pasien"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Terbanyak {mostCommonEducation} : {mostCommonEducationCount} pasien <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Dihitung dari total pasien sebanyak {totalPasien} pasien
        </div>
      </CardFooter>
    </Card>
  );
}
