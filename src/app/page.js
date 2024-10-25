"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("/api/get-country") // Call to your internal API route
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="App">
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
};

export default page;
