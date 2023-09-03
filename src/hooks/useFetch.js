import { useEffect, useState } from "react";

export default function useFetch (url, method="GET") {
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [postData, setPostData] = useState([]);

    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;
        let options = {
          signal, 
          method
        }

        let fetchData = () => {
          setLoading(true);
          fetch(url, options)
            .then(res => {
              if (!res.ok) {
                throw Error('Something went wrong!');
              }
              return res.json();
            })
            .then(data => {
              setError(false);
              setLoading(false);
              return setData(data);
              })
            .catch(e => {
              setError(e.message);
              setLoading(false);
            })
        }

        if (method === "GET") {
          fetchData();
        }

        if (method === "POST" && postData.id && postData.title && postData.description && postData.categories) {
          options = {
            ...options,
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
          }
          fetchData(options);
        }

          return () => abortController.abort();
    }, [url, postData]);
    return { setPostData, data, loading, error };
}