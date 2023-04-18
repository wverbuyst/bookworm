import { BaseStateSelect, UI } from "./State";

interface Library {
  id: string;
  library: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
}

export type LibraryDetails = Omit<Library, "library" | "postal_code"> & {
  name: string;
  postalCode: string;
};

export interface LibraryState extends BaseStateSelect<Library, LibraryDetails> {
  ui: UI<LibraryDetails, null>;
}
