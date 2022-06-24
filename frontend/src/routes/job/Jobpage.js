import '../../App.css';

import { useEffect, useState } from "react";

import JobList from "../../components/job/JobList";
import React from 'react';
import axios from "axios";

const Jobpage = () => {

  const [totalJobs, setTotalJobs] = useState([]);
  useEffect(() => { getJobs() }, []);

  const getJobs = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/jobs", []).then(response => {
      setTotalJobs(response.data);
    });
  }
  
  return (
    <>
      <JobList data={totalJobs} />
    </>
  );
};

export default Jobpage;