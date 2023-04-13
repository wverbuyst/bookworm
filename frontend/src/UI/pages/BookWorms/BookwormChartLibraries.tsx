import { Box, Spinner } from "@chakra-ui/react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { useAppState } from "../../../business/overmind";
import { useGetBookwormStatsLibrary } from "../../hooks/useGetBookwormStatsLibrary";

function BookwormChartLibraries() {
  const { isLoading } = useAppState().app;
  useGetBookwormStatsLibrary();
  const data = useAppState().bookworm.statsLibrary || [];

  const dataForChart = data.map((d) => ({
    libraryName: `${d.library_name} ${d.user_active}`,
    numberOfBookworms: d.number_of_bookworms_per_library,
  }));

  if (isLoading) {
    return <Spinner />;
  }

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Box>
      {data.length ? (
        <Box>
          <PieChart width={400} height={400}>
            <Legend verticalAlign="bottom" height={36} />
            <Pie
              data={dataForChart}
              dataKey="numberOfBookworms"
              nameKey="libraryName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dataForChart.map((entry, index) => (
                <Cell
                  key={`cell-${entry.libraryName}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
      ) : (
        <p>no libraries</p>
      )}
    </Box>
  );
}

export default BookwormChartLibraries;
