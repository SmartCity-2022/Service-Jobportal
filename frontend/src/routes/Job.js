import '../App.css';

import React, {useEffect, useState} from 'react';

import JobDetailCard from '../components/JobDetailCard'
import axios from "axios";
import { useParams } from 'react-router-dom';

const Jobs = () => {

  let { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {getJob()}, []);

  const getJob = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/jobs/" + id).then(response => setJob(response.data));
  }

  return (
    <>
       <JobDetailCard job = {job}/>
    </>
  );
};

export default Jobs;