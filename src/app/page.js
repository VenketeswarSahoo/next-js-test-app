import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    axios
      .get("/api/get-country") // Call to your internal API route
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  return <div>page</div>;
};

export default page;
