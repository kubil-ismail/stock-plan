import React from "react";
import {
  FileText,
  Target,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Page() {
  const plans: any = [];
  const stats = {};

  // Mock performance data
  const performanceData = [
    { month: "Sep", value: 0 },
    { month: "Oct", value: 2.5 },
    { month: "Nov", value: 1.8 },
    { month: "Dec", value: 4.2 },
    { month: "Jan", value: 5.5 },
    { month: "Feb", value: 7.2 },
  ];

  const recentPlans = plans.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Planned":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Closed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your trading activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Trade Plans
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-foreground">{0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Planned and active trades
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Trading Setups
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-foreground">{0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Reusable strategies
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Invested Value
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-foreground">
              ${0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In active positions
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Win Ratio
            </CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-foreground">
              {0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Closed trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Activity className="h-5 w-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  label={{
                    value: "Return (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#64748b",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={{ fill: "#16a34a", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer> */}
          </div>
        </CardContent>
      </Card>

      {/* Recent Plans */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Trade Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                    Ticker
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                    Setup
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                    Entry Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                    Entry Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No trade plans yet. Create your first plan to get started.
                    </td>
                  </tr>
                ) : (
                  recentPlans.map((plan) => (
                    <tr
                      key={plan?.id}
                      className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="text-sm text-foreground">
                          {plan?.ticker}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {plan?.setupName}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-foreground">
                          ${plan.entryPrice.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(plan.entryDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={getStatusColor(plan.status)}
                        >
                          {plan.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
