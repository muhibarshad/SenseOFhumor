import React from "react";
import Dashboard from "../dashboard/dashboard";
import Grid from '@mui/material/Grid';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Button, Container, Typography, useThemeProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SOHCard from "./devCard";
import StyleCard from "./styleCard";
import SOHPage from "../Card/SOHPage";
import CreatePage from "../Card/createPage";


const  FinalCard =(props)=>{
    const navigate = useNavigate()
    return <Dashboard name="Sense of humor Card">
   <Container maxWidth="md" sx={{mt:{md:9, sm:0}}}>
   {props.value ? <div>
   <SOHCard mod={props.value} data={props.data}/>
    <StyleCard data={props.data}/></div> :<CreatePage/>}
   </Container>
   </Dashboard>
}
export default FinalCard;