import { atom } from "jotai";

type Phase = "create" | "code";
export const emailSignUpPhaseAtom = atom<Phase>("create");
