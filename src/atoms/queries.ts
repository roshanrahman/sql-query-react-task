import { atom } from "jotai";
import { Query } from "@/types/query";

const initialData = {
    initial1: {
        id: "initial1",
        name: "Customer Query",
        sql: "SELECT * from customers;"
    },
    initial2: {
        id: "initial2",
        name: "Territory Query",
        sql: "SELECT * from territories;"
    },
    initial3: {
        id: "initial3",
        name: "Customer & Territory Query",
        sql: "SELECT customer, territory from customers;"
    }
}

export const queryListAtom = atom<Record<string, Query>>(initialData);
