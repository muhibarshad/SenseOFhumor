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
import Classes from './signup.module.css'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const validationSchema = yup.object({
    first: yup
    .string('Enter your first name')
    .required('First name is required'),
    last: yup
    .string('Enter your last name')
    .required('Last name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string('Enter your confirm password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
const Signup = (props)=>{
  const navigate= useNavigate()
    const formik = useFormik({
      initialValues: {
        first: '',
        last: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const name = `${values.first} ${values.last}`;
        const userData = {
          name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword
        };
        try {
          const user = await fetch('http://localhost:3002/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const res = await user.json();
          if(res){
            console.log(res)
            localStorage.setItem('token',res.token)
            localStorage.setItem('id',res.data.id)
            props.loginHandler(true);
            navigate('/dashboard')
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
            <Grid item md={4} sx={{mt:width>viewPort? 10 : 2,mb:10, bgcolor:'white'}}>
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
                                 Sense of Humor
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="subtitle1"  gutterBottom>
                        Create your sense of humor tags, and share it in your about
                                and tell people what type of sense of humor you have 
                                </Typography>
                        <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    >      
                    <Grid item>
<form onSubmit={formik.handleSubmit}>

    <Grid container direction="row" spacing={2}>
        <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          id="first"
          name="first"
          label="First name"
          value={formik.values.first}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first && Boolean(formik.errors.first)}
          helperText={formik.touched.first && formik.errors.first}
          sx={{mt:2}}
          variant="standard"
        />
        </Grid>
        <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          id="last"
          name="last"
          label="Last name"
          value={formik.values.last}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last && Boolean(formik.errors.last)}
          helperText={formik.touched.last && formik.errors.last}
          sx={{mt:2}}
          variant="standard"

        />
        </Grid>
    </Grid>
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
          autoComplete={true}

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
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          sx={{mt:2}}
          variant="standard"


        />
        <Button sx={{bgcolor:"#5783db",'&:hover':{
            bgcolor:'#1847a4'
        }, width:'45vh', ml:4, mt:3}}variant="contained" fullWidth type="submit"
          >
          Sign up
        </Button>
</form>
                    </Grid>
                    <Grid item>
                    <Grid container spacing={1} sx={{mt:1}}>
                        <Grid item>
                            <Typography variant="subtitle2">Do you have already Account ?</Typography>
                        </Grid>
                        <Grid item >
                        <Typography variant="caption1">
                            <Link to="/login">Login</Link>
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

export default Signup