import { Box } from "@chakra-ui/react";
import { useAppState } from "../../../business/overmind";
import BarChartForStatistics from "../../components/Charts/BarChart";
import { useGetAuthorStatsPage } from "../../hooks/useGetAuthorStatsPage";

function AuthorsChart() {
  useGetAuthorStatsPage();
  const data = useAppState().authorForStatistics;

  return (
    <Box>
      {data ? (
        <BarChartForStatistics
          data={data}
          dataKey="books_written"
          title="amount of books written books by authors"
        />
      ) : (
        <p>no authors</p>
      )}
    </Box>
  );
}

export default AuthorsChart;
