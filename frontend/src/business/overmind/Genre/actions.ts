/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";
import { Context } from "..";

export const getGenres = async ({ actions, effects, state }: Context) => {
  state.app.isLoading = true;
  const response = await effects.genre.api.getGenres();

  if (!response || response instanceof AxiosError) {
    actions.api.handleErrorResponse({ response });
  } else {
    state.genre.getAllApi = response;
  }

  state.app.isLoading = false;
};
