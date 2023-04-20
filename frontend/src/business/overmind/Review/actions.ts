/* eslint-disable no-param-reassign */
import { AxiosError } from "axios";
import { Context } from "..";

export const getReviews = async (
  { actions, effects, state }: Context,
  { limit, page }: { limit: number; page: number }
) => {
  state.review.isLoading = true;
  actions.api.resetApiResponse();
  const response = await effects.review.api.getReviews({ limit, page });

  if (!response || response instanceof AxiosError) {
    actions.api.handleErrorResponse({ response });
  } else {
    state.review.getAllApi = response;
  }

  state.review.isLoading = false;
};

export const postReview = async (
  { state, effects }: Context,
  {
    author,
    bookTitle,
    review,
    rating,
  }: {
    author: string;
    bookTitle: string;
    review: string;
    rating: number | null;
  }
) => {
  state.review.isLoading = true;
  const { token } = state.auth;
  const response = await effects.review.api.postReview(
    author,
    bookTitle,
    review,
    rating,
    token
  );
  if (response.status === "success") {
    state.api.response = {
      message: response.message,
      status: "success",
    };
  } else {
    state.api.response = {
      statusText: "Bad request",
      message: response.message,
      status: "error",
    };
  }
  state.review.isLoading = false;
};
