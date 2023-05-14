import { ViewIcon } from "@chakra-ui/icons";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import {
  stateSectionsWithTable,
  useActions,
  useAppState,
} from "../../../business/overmind";
import { TableOverview } from "../../components/Table";
import { BookwormsDetails } from "./BookwormsDetails";
import { BookwormsFilter } from "./BookwormsFilter";
import { BookwormsSearch } from "./BookwormsSearch";

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
  const {
    overview,
    ui: {
      table: { noDataMessage },
    },
  } = useAppState().bookworm;

  return (
    <Box>
      <BookwormsFilter />
      <BookwormsSearch />

      {overview ? (
        <TableOverview
          actionButtons={[ShowDetailsButton]}
          state={stateSectionsWithTable.bookworm}
          pagination
        />
      ) : (
        <p>{noDataMessage}</p>
      )}
    </Box>
  );
}
