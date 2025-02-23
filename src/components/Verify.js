import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");
  const id = searchParams.get("id");
//   const BASE_URL = "http://localhost:9000/api/v1"; // Local
// Uncomment this line and comment the above line for production
const BASE_URL = "https://api.poltic.in/api/v1";


  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/users/verify?id=${id}`)
        .then((response) => {
            console.log(response.data)
          if (response.status===200) {
            setStatus("Verification Successful!");
          } else {
            setStatus("Verification Failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error(error);
          setStatus("An error occurred during verification.");
        });
    } else {
      setStatus("No ID provided in the URL.");
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verification Page</h1>
      <p className="text-lg mt-4">{status}</p>
    </div>
  );
};

export default Verify;



