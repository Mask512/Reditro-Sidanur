import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


type DashboardCardProps = {
  title: string;
  value: number | string;
  info?: string;
  icon: React.ReactNode;
};

export const DashboardCard = ({ title, value, info, icon }: DashboardCardProps) => {
  return (
    <Card>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col justify-center w-40">
          <CardHeader className="pb-2 ">
            <CardDescription className="text-center">{title}</CardDescription>
            <CardTitle className="text-6xl text-center">{value}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground text-center">
              {info}
            </div>
          </CardContent>
        </div>
        {icon}
      </div>
    </Card>
  );
};