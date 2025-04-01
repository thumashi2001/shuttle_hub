import React,{useState,useEffect} from 'react'
import axios from "axios";
import FeedbackCard from './feedbackCard';
import "./FeedbackList.css";

const FeedbackList = () => {

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/api/feedbacks").then((res)=>{
        setFeedbacks(res.data);
        console.log(res.data);
    })
    .catch(()=>{
        console.log("Error while getting data");
    });
  }, []);

  const feedbacksList = 
   feedbacks.length === 0 
     ? "no employees found !"  
     : feedbacks.map((feedback,index)=>(<FeedbackCard key={index} feedback={feedback}/>)
       
    );

  return (
    <div className="show_FeedbackList">
        <div className="container">
            <div className="list">{feedbacksList}</div>
        </div>
      

    </div>
  )
}

export default FeedbackList
