type PromiseStatus = "pending" | "resolved" | "rejected";

export interface ResourceResponse<T, S extends PromiseStatus = "pending"> {
  status: S;
  result: S extends "rejected" ? Error : T;
}

export function createResource<T>(promiseFn: Promise<T>): {
  read: () => Promise<ResourceResponse<T, PromiseStatus>>;
} {
  let response: ResourceResponse<T, PromiseStatus> = {
    result: undefined as unknown as T,
    status: "pending",
  };

  return {
    read: async () => {
      try {
        const promiseRes = await promiseFn;
        response = {
          result: promiseRes,
          status: "resolved",
        } as ResourceResponse<T, "resolved">;

        return response;
      } catch (error) {
        response = {
          result: error as Error,
          status: "rejected",
        };
        console.log("Rejected", response);
        return response;
      }
    },
  };
}
