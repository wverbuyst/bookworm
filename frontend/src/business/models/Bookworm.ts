import { ApiResponse, BaseState, UI } from "./State";
import { UserApi } from "./User";

export interface Bookworm {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_is_active: boolean;
  library_name: string;
}

interface Library {
  id: string;
  library_name: string;
  user_active: boolean;
  number_of_bookworms_per_library: number;
}

interface LibraryDisplay {
  userIsActive: string;
  libraryName: string;
  numberOfBookworms: number;
  color: string;
}

interface Filter {
  active: boolean;
}
export interface BookwormState extends BaseState<Bookworm> {
  bookwormDetailsApi: Omit<UserApi, "token"> | null;
  statsLibrary: LibraryDisplay[];
  statsLibraryApi: ApiResponse<Array<Library>> | null;
  ui: UI<Bookworm, Filter>;
}
