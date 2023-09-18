import { activeQueryIdAtom } from "@/atoms/activeQuery";
import { queryListAtom } from "@/atoms/queries";
import { queryResultsListAtom } from "@/atoms/queryResults";
import { mockFetchFunction } from "@/services/mockFetch";
import { Query } from "@/types/query";
import { generateId } from "@/utils/generateId";
import { useAtom } from "jotai";

export function useQueryManager() {
  const [queryList, setQueryList] = useAtom(queryListAtom);
  const [resultsList, setResultsList] = useAtom(queryResultsListAtom);
  const [activeQueryId, setActiveQueryId] = useAtom(activeQueryIdAtom);

  function createQuery(initialVal?: Query): Query {
    let newQuery: Query = {
      id: generateId(),
      name: "",
      sql: "",
    };

    if (initialVal) {
      newQuery = initialVal;
    }

    updateQueryData(newQuery);
    return newQuery;
  }

  function updateQueryData(query: Query) {
    setQueryList((prevQueryList) => ({
      ...prevQueryList,
      [query.id]: query,
    }));
  }

  async function fetchQueryResult(query: Query): Promise<void> {
    setResultsList((resultsList) => ({
      ...resultsList,
      [query.id]: {
        lastRun: new Date(),
        queryId: query.id,
        status: "loading",
      },
    }));
    try {
      const csvStr = await mockFetchFunction(query.sql);
      setResultsList((resultsList) => ({
        ...resultsList,
        [query.id]: {
          ...(resultsList[query.id] ?? {}),
          result: {
            type: "success",
            data: csvStr,
          },
          status: "done",
        },
      }));
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";
      setResultsList((resultsList) => ({
        ...resultsList,
        [query.id]: {
          ...(resultsList[query.id] ?? {}),
          result: {
            type: "error",
            error: errorMsg,
          },
          status: "done",
        },
      }));
    }
  }

  function deleteQuery(id: string) {
    setQueryList((queryList) => {
      delete queryList[id];
      return { ...queryList };
    });
    setResultsList((resultsList) => {
      delete resultsList[id];
      return { ...resultsList };
    });
    if (id === activeQueryId) {
      setActiveQueryId(
        Object.keys(queryList)
          .filter((qId) => qId !== id)
          .at(-1) ?? null
      );
    }
  }

  function selectQueryById(id: string) {
    if (queryList[id]) {
      return queryList[id];
    }
    return null;
  }

  function selectQueryResultById(id: string) {
    if (resultsList[id]) {
      return resultsList[id];
    }
    return null;
  }

  function selectAllQueries() {
    return Object.values(queryList);
  }

  return {
    createQuery,
    updateQueryData,
    fetchQueryResult,
    deleteQuery,
    selectQueryById,
    selectQueryResultById,
    selectAllQueries,
  };
}
