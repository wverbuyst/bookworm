import { Flex, Spinner } from "@chakra-ui/react";
import { genericSearch } from "../../../business/functions";
import { useAppState } from "../../../business/overmind";
import { TableOverview } from "../../components/Table";
import { PageTitle } from "../../components/Text";
import SimpleSidebar from "./SideMenu";

export function AdminGenrePage() {
  const { isLoading } = useAppState().app;
  const {
    overview,
    ui: {
      table: { columns, noDataMessage, queryString, searchKeys },
    },
  } = useAppState().genre;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SimpleSidebar>
      <PageTitle title="Genre" />
      <Flex style={{ backgroundColor: "#fff" }}>
        {overview?.length ? (
          <TableOverview
            rows={overview.filter((a) =>
              genericSearch(a, searchKeys, queryString, false)
            )}
            columns={columns}
          />
        ) : (
          <p>{noDataMessage}</p>
        )}
      </Flex>
    </SimpleSidebar>
  );
}
