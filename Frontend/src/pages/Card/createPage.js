import React from "react";
import Grid from '@mui/material/Grid';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePage =()=>{
    const navigate = useNavigate()
    return <>
      
   <Container maxWidth="md" sx={{mt:{md:9, sm:0}}}>
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
        <Grid item >
        <Typography variant="h6" sx={{ fontSize: 100, textAlign:'center'}}>
        Sense of Humor
         </Typography>
        </Grid>
        <Grid item>
        <Button onClick={(e)=>{
            e.preventDefault()
            navigate('/your-card')
        }}
        variant="contained" sx={{bgcolor:"#5783db",'&:hover':{
            bgcolor:' #1847a4',
        }, width:{md:'30vh', sm:'35vh'},height:'8vh', borderRadius:"50px"}}>
    <Typography variant="subtitle1" sx={{fontWeight:"bold", fontSize:{sm:2, md:18}} }>
        Create your Card
    </Typography>
    <br/>
    <AddSharpIcon sx={{ fontSize: 40 }}/>
    </Button>
        </Grid>
        <Grid item>
        <Typography variant="h4" sx={{mt:6, textAlign:'center'}}>
    Create your sense of humor tags, and share it in your about
                                and tell people what type of sense of humor you have.
    </Typography>
        </Grid>
    </Grid>    
   </Container>
   </>
}
export default CreatePage;