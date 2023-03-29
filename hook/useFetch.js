import { useState, useEffect } from "react";
import axios from "axios";

const rapidApiKey = "5504bb8efamsh0bc0a72fa054b62p1414fcjsn4d8d9d51ad17";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);

      setData(response.data.data);

      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 429) {
        // Add a delay of 2 second before retrying the request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        fetchData();
      } else {
        setError(error);
        alert("There is an error");
      }
      // alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    isLoading(true);
    fetchData();
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
