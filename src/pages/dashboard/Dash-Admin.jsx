import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export function Profil() {
  const [summary, setSummary] = useState({
    revenue: 0,
    deals: 0,
    tickets: 0,
    replyTime: "0:00",
  });

  const [revenueData, setRevenueData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  // Simulasi data sementara (mock data)
  useEffect(() => {
    const mockSummary = {
      revenue: 4250,
      deals: 1625,
      tickets: 3452,
      replyTime: "8:02",
    };

    const mockRevenue = [
      { name: "21 Oct", value: 1200 },
      { name: "28 Oct", value: 2700 },
      { name: "4 Nov", value: 3200 },
      { name: "11 Nov", value: 5000 },
      { name: "18 Nov", value: 4100 },
      { name: "Today", value: 1800 },
    ];

    const mockTickets = [
      { name: "Jan", Created: 30, Solved: 20 },
      { name: "Feb", Created: 45, Solved: 35 },
      { name: "Mar", Created: 60, Solved: 50 },
      { name: "Apr", Created: 50, Solved: 40 },
      { name: "May", Created: 65, Solved: 60 },
      { name: "Jun", Created: 55, Solved: 50 },
      { name: "Jul", Created: 70, Solved: 65 },
      { name: "Aug", Created: 80, Solved: 75 },
      { name: "Sep", Created: 60, Solved: 55 },
      { name: "Oct", Created: 90, Solved: 85 },
      { name: "Nov", Created: 100, Solved: 95 },
      { name: "Dec", Created: 120, Solved: 110 },
    ];

    setSummary(mockSummary);
    setRevenueData(mockRevenue);
    setTicketData(mockTickets);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-100 shadow-lg">
          <CardBody>
            <Typography variant="h6" className="text-blue-800 font-bold">
              Product Revenue
            </Typography>
            <Typography variant="h4" className="text-blue-900 font-extrabold">
              €{summary.revenue}
            </Typography>
            <Typography variant="small" className="text-blue-600">
              + Revenue
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-green-100 shadow-lg">
          <CardBody>
            <Typography variant="h6" className="text-green-800 font-bold">
              Total Deals
            </Typography>
            <Typography variant="h4" className="text-green-900 font-extrabold">
              {summary.deals}
            </Typography>
            <Typography variant="small" className="text-green-600">
              + Deals
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-yellow-100 shadow-lg">
          <CardBody>
            <Typography variant="h6" className="text-yellow-800 font-bold">
              Created Tickets
            </Typography>
            <Typography variant="h4" className="text-yellow-900 font-extrabold">
              {summary.tickets}
            </Typography>
            <Typography variant="small" className="text-yellow-600">
              + Tickets
            </Typography>
          </CardBody>
        </Card>
        <Card className="bg-purple-100 shadow-lg">
          <CardBody>
            <Typography variant="h6" className="text-purple-800 font-bold">
              Average Reply
            </Typography>
            <Typography variant="h4" className="text-purple-900 font-extrabold">
              {summary.replyTime}
            </Typography>
            <Typography variant="small" className="text-purple-600">
              + Faster
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Grafik Total Revenue */}
      <Card className="mb-8 shadow-lg">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-blue-800 font-bold">
            Total Revenue
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
              <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Grafik Tiket Bulanan */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h6" className="mb-4 text-green-800 font-bold">
            Avg. Ticket Created
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Created" fill="#3b82f6" />
              <Bar dataKey="Solved" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profil;