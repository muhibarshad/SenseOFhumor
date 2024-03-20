import React from "react";
import Dashboard from "../dashboard/dashboard";
import CreatePage from "./createPage";
import StyleCard from "../DevCard/styleCard";

const SOHPage =(props)=>{
    return <Dashboard name="Your Card"> 
    {props.value ? <div>
   < StyleCard data={props.data}/></div> :<CreatePage/>}   
   </Dashboard>
}
export default SOHPage;