import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import responseData from "../response.json";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = responseData.map((entry, index) => {
      const consumption =
        index === 0 ? 0 : responseData[index - 1].fuel_level - entry.fuel_level;
      return {
        timestamp: new Date(entry.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }), // Format timestamp to HH:MM:SS
        fuel_level: entry.fuel_level,
        consumption: consumption > 0 ? consumption : 0, 
      };
    });

    setData(formattedData);
  }, []);

  return (
    <div className={"my-5 p-2"}>
          {/* Title of the Chart */}
      <div className={"text-[24px] font-semibold text-center m-5 text-gray-700"}>Fuel Consumption</div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /> {/* Dashed grid lines */}


          {/* XAxis for Timestamp */}
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            interval={Math.floor(data.length / 10)} // Show tick labels at intervals similar to assessment
            label={{ value: "Timestamp", position: "insideBottom", offset: -5 }}
          />

          {/* YAxis for Fuel Level Only */}
          <YAxis
            tick={{ fontSize: 12 }} 
            domain={[0, 250]} // Ensure consistent Y-axis as in the chart (0 to 250)
            label={{ value: "Fuel Level", angle: -90, position: "insideLeft" }} // Only "Fuel Level" as Y-axis label
          />

          {/* Tooltip and Legend */}
          <Tooltip /> {/*Show tooltip on hover */}
          <Legend /> {/*Show legend for fuel level and consumption */}

          {/* Fuel Level Line (Red Line) */}
          <Line
            type="monotone" // Smooth curve
            dataKey="fuel_level" // Fuel Level data
            stroke="#ff7300" // Orange color
            activeDot={{ r: 6 }} // Larger dot on hover
          />

          {/* Fuel Consumption Line (Green Line) */}
          <Line type="monotone" dataKey="consumption" stroke="#00ff00" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
