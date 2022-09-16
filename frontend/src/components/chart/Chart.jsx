import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

const Chart = ({ aspect, title }) => {
  const { players, loading } = useSelector((state) => state.playerReducer);
  const dispatch = useDispatch();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = [
    {
      name: monthNames[new Date().getMonth() - 2],
      Total: players.filter(
        (item) =>
          monthNames[new Date().getMonth() - 2] ===
          monthNames[new Date(item.createdAt).getMonth()]
      ).length,
    },
    {
      name: monthNames[new Date().getMonth() - 1],
      Total: players.filter(
        (item) =>
          monthNames[new Date().getMonth() - 1] ===
          monthNames[new Date(item.createdAt).getMonth()]
      ).length,
    },
    {
      name: monthNames[new Date().getMonth()],
      Total: players.filter(
        (item) =>
          monthNames[new Date(item.createdAt).getMonth()] ===
          monthNames[new Date().getMonth()]
      ).length,
    },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
