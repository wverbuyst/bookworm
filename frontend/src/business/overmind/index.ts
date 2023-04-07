import { IContext } from "overmind";
import {
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createStateHook,
} from "overmind-react";
import { namespaced } from "overmind/config";
import * as auth from "./Auth";
import * as author from "./Author";
import * as book from "./Book";
import * as bookworm from "./Bookworm";
import * as rental from "./Rental";
import * as review from "./Review";
// import * as actions from "./actions";
// import * as effects from "./effects";
// import { state } from "./state";

export const config = namespaced({
  auth,
  author,
  book,
  bookworm,
  rental,
  review,
});

export type Context = IContext<{
  state: typeof config.state;
  actions: typeof config.actions;
  effects: typeof config.effects;
}>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();
