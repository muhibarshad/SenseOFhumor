import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RecipeReviewCard from './card';
import StyleCard from './styleCard';



export default function SOHCard(props) {
  const [open, setOpen] = React.useState(props.mod);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        keepMounted={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
         <StyleCard data={props.data}/>
      </Modal>
    </div>
  );
}