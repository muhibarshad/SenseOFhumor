import { Box, Typography, useThemeProps } from "@mui/material";
import RecipeReviewCard from "./card";
const StyleCard =(props)=>{
    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
    return <>
    <Box sx={style}>
    <RecipeReviewCard data={props.data}/>
    </Box>
    </>
}

export default StyleCard