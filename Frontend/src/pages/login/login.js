import  Container  from "@mui/material/Container";
import React from "react";
import Grid from '@mui/material/Grid';
import cover from '../../assets/coverImg.jpg'
import ideas from '../../assets/howlsPFP.jpeg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Classes from '../signup/signup.module.css'
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });


const Login = (props)=>{
  const navigate= useNavigate()
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
          const userData = {
            email: values.email,
            password: values.password,
          };
          try {
            const user = await fetch('http://localhost:3001/login', {
              method: 'POST',
              body: JSON.stringify(userData),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const res = await user.json();
            if(res){
              console.log(res)
              props.loginHandler(true);
              navigate('/profile')
            }
          } catch (error) {
            console.error('Error:', error);
          }
        },
      });
      const [width, setWidth] = useState(window.innerWidth)
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
    return <>
    <Container maxWidth="" disableGutters={true} >
        <Grid container spacing={0} direction="row">
            {width>viewPort ? <Grid item md={8} sx={{sm:{display:'none'}, md:{display:'block'}}}>
                  <img src={cover} alt="cover" className={Classes.cover}/>
            </Grid> :''}
            <Grid item md={4} sx={{mt:width>viewPort? 20 : 10,mb:10, bgcolor:'white'}}>
                <Container>
                    <Box sx={{
                        height:'50vh',
                        width:'50vh'
                    }}>
                        <Grid container direction="column" justifyContent="center"
                        alignItems="center">
                            <Grid item md={4}>
                            <img src={ideas} alt="cover" className={Classes.logo}/>
                            </Grid>
                            <Grid item md={8} sx={{mb:2, mt:2}}>
                                 <Typography variant="h3">
                                 FypIdeas
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle1"  gutterBottom>
                                Here, we write our Einstienc ideas of fyp to save the future of anime
                                </Typography>
                        <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    >      
                    <Grid item>
<form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.valconfirmPasswordl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{mt:2}}
          variant="standard"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{mt:2}}
          variant="standard"
                />
        <Button sx={{bgcolor:"#5783db",'&:hover':{
            bgcolor:'#1847a4'
        }, width:'45vh', ml:4, mt:3}}variant="contained" fullWidth type="submit"
          >
          Login
        </Button>
</form>
                    </Grid>
                    <Grid item>
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item>
                            <Typography variant="subtitle2">Do you have'nt account?</Typography>
                        </Grid>
                        <Grid item >
                        <Typography variant="caption1">
                        <Link to="/sign-up">Signup</Link>
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                     </Grid>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    </Container>

    </>
}

export default Login