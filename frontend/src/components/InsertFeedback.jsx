import React, {useState} from 'react'
import "./InsertFeedback.css";
import axios from 'axios';


const InsertFeedback = () => {

    const [feedbackData, setFeedbackData] = useState({
       customerID: "",
       name: "",
       feedback: "",
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFeedbackData({
            ...feedbackData,
            [name]:value,
        });
        console.log(feedbackData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/feedbacks",feedbackData).then(()=> {
            setFeedbackData({
                customerID: "",
                name: "",
                feedback: "",
            });
        });
    };

  return (
    <div>
      <h2>Give Feedback</h2>
      <br/>
    <form onSubmit={handleSubmit}>
    <div>
        <label for="customer_id">CustomerID:</label>
        <input type="text" id="customer_id" name="customerID" onChange={handleChange} value={feedbackData.customerID}/>
        </div>

        <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={feedbackData.name}/>
        </div>
        
        
  
       <div>
       <label for="feedback">Feedback:</label>
        <input type="text" id="feedback" name="feedback" onChange={handleChange} value={feedbackData.feedback}/>
        </div>
        <br/>
        
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
    </div>
    
  )
}

export default InsertFeedback
