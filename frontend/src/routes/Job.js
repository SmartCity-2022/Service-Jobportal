import React, {useState, useEffect} from 'react';
import axios from "axios";
import JobDetailCard from '../components/JobDetailCard'
import '../App.css';
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