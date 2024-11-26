"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_IP_TRACK_KEY);

    axios
      .get("/api/get-country") // Call to your internal API route
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleVerification = async file => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/passportVerification", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.status === 200) {
        return data.status_code;
      }
    } catch (error) {
      console.error(error);
      return 500;
    }
  };

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    const status = await handleVerification(file);
    console.log(status);
  };

  return (
    <div className="App">
      <p>
        {JSON.stringify(data)}
      </p>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default page;
