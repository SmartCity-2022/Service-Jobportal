import '../App.css';

import { useEffect, useState } from "react";

import Jobcard from "../components/Jobcard";
import React from 'react';
import axios from "axios";

const Jobs = () => {

  const [totalJobs, setTotalJobs] = useState([]);
  useEffect(() => { getJobs() }, []);

  const getJobs = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/jobs", []).then(response => {
      setTotalJobs(response.data);
    });
  }

  return (
    <>
      <Jobcard data={totalJobs} />
    </>
  );
};

export default Jobs;