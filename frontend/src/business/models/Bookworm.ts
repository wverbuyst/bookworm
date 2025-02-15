import { z } from "zod";
import { UI } from "./State";
import { User } from "./User";

export const ApiResponseBookworm = z.object({
  status: z.string(),
  result: z.number(),
  data: z
    .object({
      id: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      phone: z.string(),
      user_is_active: z.boolean(),
      library: z.string(),
    })
    .array(),
  total: z.number(),
  message: z.string(),
});

export type ApiResponseBookworm = z.infer<typeof ApiResponseBookworm>;

export interface Bookworm {
  id: string;
  "first name": string;
  "last name": string;
  email: string;
  phone: string;
  userIsActive: boolean;
  library: string;
}

export const ApiResponseBookwormStatsLibrary = z.object({
  status: z.string(),
  result: z.number(),
  data: z
    .object({
      id: z.string(),
      library: z.string(),
      user_is_active: z.boolean(),
      number_of_bookworms_per_library: z.number(),
    })
    .array(),
  message: z.string(),
});

export type ApiResponseBookwormStatsLibrary = z.infer<
  typeof ApiResponseBookwormStatsLibrary
>;

interface Library {
  id: string;
  library: string;
  userIsActive: boolean;
  numberOfBookwormsPerLibrary: number;
  color: string;
}

interface Filter {
  active: boolean;
}

export const ApiResponseBookWormById = z.object({
  status: z.string(),
  data: User,
  message: z.string(),
});

export type ApiResponseBookWormById = z.infer<typeof ApiResponseBookWormById>;
export interface BookwormState {
  getAllApi: ApiResponseBookworm | null;
  isLoading: boolean;
  overview: Bookworm[];
  bookwormDetailsApi: ApiResponseBookWormById | null;
  statsLibrary: Library[];
  statsLibraryApi: ApiResponseBookwormStatsLibrary | null;
  ui: UI<Bookworm, Filter>;
}
