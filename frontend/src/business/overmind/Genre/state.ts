import { derived } from "overmind";
import { GenreState } from "../../models";

export const state: GenreState = {
  getAllApi: null,
  selectOptions: derived(({ getAllApi }: GenreState) => {
    if (!getAllApi?.data.length) {
      return null;
    }
    return getAllApi.data.map((i) => ({
      display: i.genre,
      value: i.id,
    }));
  }),
};
