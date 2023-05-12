import { derived } from "overmind";
import { genericSearch, genericSort } from "../../functions";
import { LanguageState, SortDirection } from "../../models";

export const state: LanguageState = {
  isLoading: false,
  getAllApi: null,
  overview: derived(
    ({
      getAllApi,
      ui: {
        table: { searchKeys, queryString, sort },
      },
    }: LanguageState) => {
      if (!getAllApi?.data?.length) {
        return [];
      }
      return getAllApi.data
        .map((i) => ({
          id: i.id,
          "name of language": i.name_of_language,
        }))
        .filter((a) => genericSearch(a, searchKeys, queryString, false))
        .sort((a, b) =>
          genericSort(a, b, {
            property: sort.property,
            sortDirection: sort.sortDirection,
          })
        );
    }
  ),
  selectOptions: derived(({ getAllApi }: LanguageState) => {
    if (!getAllApi?.data?.length) {
      return [];
    }
    return getAllApi.data.map((i) => ({
      display: i.name_of_language,
      value: i.id,
    }));
  }),
  ui: {
    table: {
      columns: [{ field: "name of language" }],
      filter: null,
      sort: {
        property: "name of language",
        sortDirection: SortDirection.ASCENDING,
      },
      limit: 10,
      noDataMessage: "no languages",
      page: 1,
      queryString: "",
      searchKeys: ["name of language"],
      showAll: false,
      title: "overview of languages",
    },
  },
};
