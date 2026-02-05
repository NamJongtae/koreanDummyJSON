import { useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (
    url: string,
    method = "GET",
    body?: Record<string, any>,
    headers?: Record<string, any>
  ) => {
    setIsLoading(true);
    fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      ...(method === "GET" &&
        !url.includes("/auth") &&
        !url.includes("/lorem") && {
          cache: "force-cache"
        })
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  };

  return { data, isLoading, fetchData };
}

export default useFetch;
