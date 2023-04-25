import { ViewIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import { genericSearch } from "../../../business/functions";
import {
  stateSectionsWithTable,
  useActions,
  useAppState,
} from "../../../business/overmind";
import { Pagination, TableOverview } from "../../components/Table";
import { BookwormsDetails } from "./BookwormsDetails";
import { Filter } from "./Filter";

function ShowDetailsButton({ id }: { id: string }) {
  const { getBookworm } = useActions().bookworm;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUser = async (i: string) => {
    await getBookworm({ id: i });
    onOpen();
  };

  return (
    <>
      <BookwormsDetails isOpen={isOpen} onClose={onClose} />
      <IconButton
        data-tooltip-id="bookworm-tooltip"
        data-tooltip-content="Show details"
        aria-label="Show details"
        onClick={() => getUser(id)}
        icon={<ViewIcon />}
        mx={1}
      />
    </>
  );
}

export function BookwormsTable() {
  const { isLoading } = useAppState().bookworm;
  const {
    getAllApi,
    overview,
    ui: {
      table: { columns, noDataMessage, queryString, searchKeys, title },
    },
  } = useAppState().bookworm;
  const { total } = getAllApi || {};
  const { search } = useActions().bookworm;

  const searchInTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    search({ queryString: e.target.value });
  };

  return (
    <Box>
      <Filter />
      <Input onChange={searchInTable} placeholder="search" my={5} />
      {overview ? (
        <>
          <TableOverview
            rows={overview.filter((a) =>
              genericSearch(a, searchKeys, queryString, false)
            )}
            columns={columns}
            title={title}
            isLoading={isLoading}
            actionButtons={[ShowDetailsButton]}
          />
          <Pagination total={total} state={stateSectionsWithTable.bookworm} />
        </>
      ) : (
        <p>{noDataMessage}</p>
      )}
    </Box>
  );
}
