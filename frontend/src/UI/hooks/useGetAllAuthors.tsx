import { useEffect } from "react";
import { useActions, useAppState } from "../../business/overmind";

export function useGetAllAuthors() {
  const { authorsApi } = useAppState();
  const { getAllAuthors } = useActions();

  useEffect(() => {
    if (!authorsApi?.data.length) getAllAuthors({ limit: 20, page: 3 });
  }, []);
}
