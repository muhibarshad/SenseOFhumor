import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExampleTextareaComment from './textField';
import { useNavigate } from 'react-router-dom';
import SOHCard from '../DevCard/devCard';

const  InputCard=(props)=> {
    const [finalData, setFinalData] = React.useState([]);
    const navigate = useNavigate()
    let [r, setR] = React.useState(null)
    let [onAdded, setAdd] = React.useState(false)
    const [responseText, setResponseText] = React.useState('');
   

    const counterHandler=async()=>{
        if(r===null)
        return
        if(props.counter <props.len-1)
        props.setCounter(props.counter+1);
    else{
        props.setCounter(0);
    }
    props.nextThandlar(props.counter);
    if(r){
        // setFinalData((prevData) => [
        //     ...prevData,
        //     { [props.question]: r } 
        //   ]);
        setFinalData((prevData) => [
            ...prevData, r 
          ]);
               console.log(finalData)
                setAdd(true);
                setR(null);
        }
        if(props.name ==props.Arr[props.len-1]){
            
            console.log(finalData)
            props.setData(finalData.join(' '))
            //     const requestBody = {
            //       formality: 'default',
            //       max_tokens: 2048,
            //       mode: 'voice_passive',
            //       model: 'chat-sophos-1',
            //       n: 1,
            //       source_lang: 'string',
            //       target_lang: 'string',
            //       temperature: 0.65,
            //       text: JSON.stringify(finalData)
            //     };
            // try {
            //     const response = await fetch('https://api.textcortex.com/v1/texts/rewritings', {
            //       method: 'POST',
            //       headers: {
            //         'Authorization': 'gAAAAABl_JxziDnoG2ZNSNn53H16e6PxLw_iYAOK38pZaYtpPYf-38q0QShgPsZVXZ7wLlrJOAzzkM9aChS0P-qpwVA_V2cZYIGeHq0LqtMCuUNrUD5PpLJpzwRZB2ILAUA_bRR8_Pxm',
            //         'Content-Type': 'application/json'
            //       },
            //       body: JSON.stringify(requestBody)
            //     });
          
            //     if (!response.ok) {
            //       throw new Error('Network response was not ok');
            //     }
          
            //     const data = await response.json();
            //     setResponseText(data.text); 
            //   } catch (error) {
            //     console.error('Error:', error);
            //   }
            console.log(responseText)
            props.setGenerateCard(true)
            props.setIsCard(true);
            navigate('/card')
        }
    }
    
  return (
    <Card sx={{mt:props.width>props.viewPort ?20:5, width: props.width>props.viewPort ? '120vh' :'50vh', height:props.width>props.viewPort ?'50vh':'120vh',textAlign:'center'}}>
      <CardContent>
        <Typography gutterBottom variant="h3" >
          {props.name}
        </Typography>
        <Typography variant="h5" >
         {props.question}
        </Typography>
        <ExampleTextareaComment r={r}  setAdd={setAdd}add={onAdded}  handler={setR}/>
      </CardContent>
      <CardActions>
      <Button onClick={counterHandler} sx={{bgcolor:"#5783db",'&:hover':{
            bgcolor:'#1847a4'
        }, width:props.width>props.viewPort ?'35vh':'15vh', ml:props.width>props.viewPort ?40:10, mt:3}}variant="contained" fullWidth type="submit"
          >Add</Button>
      <Button variant="text" onClick={counterHandler} sx={{
        width:'10vh', ml:props.width>props.viewPort ?165:2, mt:3}}>Next</Button>
      </CardActions>
    </Card>
  );
}

export default InputCard