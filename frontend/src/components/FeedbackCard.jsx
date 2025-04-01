import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';


const FeedbackCard = ({feedback}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(feedback.name);
  const [editedFeedback, setEditedFeedback] = useState(feedback.feedback);

  const onDeleteClick = (id)=>{
    axios.delete(`http://localhost:3000/api/feedbacks/${id}`).then(()=>{
      window.location.reload();
    }).catch((err)=>{
      console.log("Delete error",err);
    });
  };

  const onEditClick = () =>{
    setIsEditing(true);
  };

  const onSaveClick = () =>{
    axios
     .put(`http://localhost:3000/api/feedbacks/${feedback._id}`,{
      name: editedName,
      feedback: editedFeedback,
     })
     .then(() =>{
      setIsEditing(false);
      window.location.reload();
     })
     .catch((err) =>{
      console.log("Update error", err);
     });
  };


  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
        title="green iguana"
      />
      <CardContent>
        {isEditing ?(
          <>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            sx={{ mb: 1}}
          />

          <TextField
            fullWidth
            label="Feedback"
            variant="outlined"
            multiline
            rows={2}
            value={editedFeedback}
            onChange={(e) => setEditedFeedback(e.target.value)}
          />
          </>  
        ) : (
          <>

        <Typography gutterBottom variant="h5" component="div">
          {feedback.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {feedback.feedback}
           </Typography>
           </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
           <Button size="small" onClick={onSaveClick}>
            Save
            </Button>
            <Button size="small" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            </>
        ) : (
          <>
        
        <Button size="small" onClick={onEditClick}>
          Edit
          </Button>
        <Button size="small" onClick={()=>onDeleteClick(feedback._id)}>
          Delete
        </Button>
        </>
        )}
      </CardActions>
    </Card>
    </div>
  )
}

export default FeedbackCard
