
import Dashboard from "../dashboard/dashboard";
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputCard from "./input";
import { useEffect,useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
const YourCard =(props)=>{
    const drawerWidth = 140;
    const tagQuestions = {
        username: "What do people call you, and what's the story behind your nickname?",
        ohiloType: "What's your ohiloType, and what does it say about you? Share a memorable experience related to your ohiloType.",
        Star: "On which day do you open your eyes, and what's the first thought that comes to your mind?",
        Music: "Who is your favorite music artist, and can you write two or three songs by them? Share a concert or music festival experience.",
        Personality: "Which type of fictional character personality do you love? Describe how you relate to them in real life.",
        Type: "What type of person are you most drawn to? Share a memorable encounter with someone who fits this description.",
        Gender: "What's your gender? How has your understanding of gender identity evolved over time?",
        Movie: "What's your favorite movie that you've watched and loved? Share a funny or touching moment from the movie.",
        Place: "What's your favorite place to relax and unwind? Describe a special memory associated with this place.",
        Vibe: "How would you describe your vibe in one word? Share an anecdote that perfectly captures your vibe.",
        Food: "What's your favorite comfort food? Share a childhood memory or a special occasion where you enjoyed this food.",
        Hobby: "What's your favorite hobby, and why? Share a project or achievement related to this hobby.",
        About: "Write one line that defines you. Then, share a story or experience that embodies this defining trait.",
        Hateful: "What types of persons do you have in your life, and what qualities do they possess that you mostly hate? Reflect on how these experiences have shaped your perspective on relationships and interactions.",
    };
    const arr = Object.keys(tagQuestions);
    
    const [keyQues, setQues]= React.useState('username');
    const [valueQues, setValueQuestion]= React.useState(tagQuestions['username']);
    const [active, setActive]=React.useState('username');
    const [generateCard, setGenerateCard]=React.useState(false);
    const handlar=(key, value)=>{
        setQues(key);
        setActive(key);
        setValueQuestion(value)
        if(arr.findIndex((el)=>el===key)+1 ==Object.keys(tagQuestions).length)
        setCounter(0)
        else
        setCounter(arr.findIndex((el)=>el===key)+1)
    }
    const nextThandlar=(next)=>{
        setQues(arr[next]);
        setActive(arr[next]);
        setValueQuestion(tagQuestions[arr[next]])
    }

    const [counter, setCounter]=React.useState(0);
    const [width, setWidth] = React.useState(window.innerWidth)
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const viewPort = 1600;
  return (

    <Dashboard name="Your Card" >
        <Container  maxWidth="lg">
        <Typography variant="h2" sx={{ml:width>viewPort ? 10 :1, textAlign:'center'}}>
            Create your Sense of humor card
        </Typography>
        </Container>
   <Grid container  spacing={2}>
   {   width>viewPort ? <Grid item md={3}><Box  maxWidth={drawerWidth} maxHeight="100vh" >
          <List sx={{overflowX: 'auto', maxHeight:'70vh',
    whiteSpace: 'nowrap', borderRight:'0.1px solid #b6bcbe'}}>
            { Object.entries(tagQuestions).map(([key, value]) => (
                <ListItem key={key} disablePadding  sx={{ backgroundColor: key === active ? '#f0f0f0' : 'transparent' }}>
                <ListItemButton onClick={()=>{
                    handlar(key, value)
                }}>
                  <ListItemText primary={key} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        </Grid> :''}
            <Grid item md ={8}>
        <InputCard name={keyQues} Arr={arr} question={valueQues} len={Object.entries(tagQuestions).length} nextThandlar={nextThandlar} counter={counter} setCounter={setCounter} width={width} viewPort={viewPort} generateCard={generateCard} setGenerateCard={setGenerateCard} setIsCard={props.setIsCard} setData={props.setData}/>
            </Grid>
        </Grid>
    </Dashboard>
  );
}

export default YourCard