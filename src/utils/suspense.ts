type PromiseStatus = "pending" | "resolved" | "rejected";

export function createResource<T = unknown>(promiseFn: Promise<T>) {
  let status: PromiseStatus = "pending";
  let result: T;

  const suspender = promiseFn.then(
    (data) => {
      status = "resolved";
      result = data;
    },
    (error) => {
      status = "rejected";
      result = error;
    },
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "rejected") throw result;
      return result;
    },
  };
}
