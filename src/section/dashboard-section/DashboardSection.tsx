import CardItem from "@/components/card-Item/CardItem";
import ChartArea from "@/components/chart-area/ChartArea";
import DataTable from "@/components/DataTable/DataTable";
import {
  BookTableHeaders,
  demoBooksData,
  demoUserData,
  UserTableHeaders,
} from "@/constant/default-values/DashboardTables";
import { Button } from "@/components/ui/button";

export default function DashboardSection() {
  return (
    <section className="h-full p-5 flex flex-col gap-5">
      <CardSection />
      <ChartArea />
      <TableSection />
    </section>
  );
}

const CardSection = () => (
  <div className="flex justify-center gap-5">
    <CardItem
      title="2000"
      description="Total Books"
      message="Collection expanding steadily with new acquisitions added regularly to serve our growing community of readers"
      available={1200}
    />
    <CardItem
      title="30"
      description="Last Month Added"
      message="Collection expanding steadily with new acquisitions added regularly to serve our growing community of readers"
    />
    <CardItem
      title="6230"
      description="Total Users"
      message="Collection expanding steadily with new acquisitions added regularly to serve our growing community of readers"
      available={1000}
    />
    <CardItem
      title="100"
      description="Last Month New User"
      message="Collection expanding steadily with new acquisitions added regularly to serve our growing community of readers"
    />
  </div>
);

const TableSection = () => (
  <div className="flex items-start gap-5">
    <DataTable
      headers={BookTableHeaders}
      data={demoBooksData}
      actionLabel="Details"
      renderAction={(data) => <Button>View Details</Button>}
    />
    <DataTable
      headers={UserTableHeaders}
      data={demoUserData}
      actionLabel="Details"
      renderAction={(data) => <Button>View Details</Button>}
    />
  </div>
);
