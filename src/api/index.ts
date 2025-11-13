import { BibleAPI } from "./bible";
import { HighlightsAPI } from "./highlights";
import { LanguagesAPI } from "./languages";
import { UsersAPI } from "./users";
import { VotdAPI } from "./votd";

export const YouVersionAPI = {
  Users: UsersAPI,
  VOTD: VotdAPI,
  Bible: BibleAPI,
  Languages: LanguagesAPI,
  Highlights: HighlightsAPI,
};
