import { useEffect } from "react";
import { useActions, useAppState } from "../../business/overmind";

export function useGetBooksworms() {
  const { getAllApi, ui } = useAppState().bookworm;
  const { getBookworms } = useActions().bookworm;
  const { limit, page } = ui.table;

  useEffect(() => {
    if (!getAllApi?.data.length) {
      getBookworms({ limit, page });
    }
  }, []);
}
