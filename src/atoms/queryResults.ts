import { QueryResult } from "@/types/query";
import { atom } from "jotai";

export const queryResultsListAtom = atom<Record<string, QueryResult>>({});
