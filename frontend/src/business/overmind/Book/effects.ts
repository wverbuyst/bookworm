import axios from "axios";
import { ApiResponse } from "../../models/Api";
import {
  Book,
  BookStatsGenre,
  BookStatsLanguage,
  BookStatsYearPublished,
} from "../../models/Book";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const api = {
  getBooks: async ({
    genre,
    language,
    limit = 10,
    page = 1,
  }: {
    genre: string | null;
    language: string | null;
    limit: number;
    page: number;
  }): Promise<ApiResponse<Array<Book>>> => {
    try {
      let url = `${BACKEND_URL}/books/?limit=${limit}&page=${page}`;
      if (language) {
        url += `&language=${language}`;
      }

      if (genre) {
        url += `&genre=${genre}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  getBookStatsGenres: async (): Promise<ApiResponse<Array<BookStatsGenre>>> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/books/stats/?by=genre`);
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  getBookStatsLanguages: async (): Promise<
    ApiResponse<Array<BookStatsLanguage>>
  > => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/books/stats/?by=language`
      );
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },

  getBookStatsYearPublished: async (): Promise<
    ApiResponse<Array<BookStatsYearPublished>>
  > => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/books/stats/?by=year_published`
      );
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  },
};
