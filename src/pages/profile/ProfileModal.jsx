import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { Avatar, Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UploadToCloud } from '../../Utils/UploadToCloud';
import defaultProfileImg from '../../Asset/download-blank.jpeg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModal({ open, handleClose }) {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const [selectedProlileImage, setSelectedProlileImage] = React.useState();
  const [selectedCoverImage, setSelecedCoverImage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectProlfileImage = async (event) => {
    setIsLoading(true)
    const profImageUrl = await UploadToCloud(event.target.files[0], "image")
    setSelectedProlileImage(profImageUrl);
    setIsLoading(false)
    formik.setFieldValue("profileImage", profImageUrl)
  }

  const handleSelectCoverImage = async (event) => {
    setIsLoading(true)
    const coverImageUrl = await UploadToCloud(event.target.files[0], "image")
    setSelecedCoverImage(coverImageUrl);
    setIsLoading(false);
    formik.setFieldValue("coverImage", coverImageUrl)
  }

  const handleSubmit = (values) => {
    console.log("values", values)
  }
  const formik = useFormik({
    initialValues: {
      firstName: auth.user.firstName || "",
      lastName: auth.user.lastName || "",
      profileImage: auth.user.profileImage || "",
      coverImage: auth.user.coverImage || "",
      location: auth.user.location || ""
    },
    onSubmit: (values) => {
      console.log("values", values)
      dispatch(updateProfileAction(values))
    },
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />

                </IconButton>
                <p>Edit Profile</p>

              </div>
              <Button onClick={() => {
                formik.handleSubmit();
                handleClose();
              }} >Save</Button>

            </div>
            <div>
              <div className='h-[15rem]' style={{ position: 'relative' }}>
                <img className='w-full h-full' src={formik.values.coverImage} alt="" />
                <input type="file" accept='image/*' onChange={handleSelectCoverImage} style={{ display: "none" }} id='cover-image-input' />
                <label htmlFor='cover-image-input'>
                  <div style={{ position: 'absolute', top: '5%', right: '4%', borderRadius: '50%', backgroundColor: 'white', padding: '6px' }}>
                    <AddAPhotoIcon style={{ color: 'black' }} />
                  </div>
                </label>
              </div>


              <div className='pl-5' style={{ position: 'relative' }}>
                <Avatar className='transform -translate-y-20' sx={{ width: "8rem", height: "8rem", border: "2px solid rgb(250, 100, 50)" }} src={selectedProlileImage || auth.user.profileImage || defaultProfileImg} />
                <input type="file" accept='image/*' onChange={handleSelectProlfileImage} style={{ display: "none" }} id='image-input' />
                <label htmlFor='image-input'>
                  <div style={{ position: 'absolute', bottom: '-1.5rem', left: '28%', transform: 'translateY(-450%)', borderRadius: '50%', backgroundColor: 'white', padding: '6px' }}>
                    <AddAPhotoIcon style={{ color: 'black', cursor: 'pointer' }} />
                  </div>
                </label>
              </div>

            </div>

            <div className='space-y-3'>
              <TextField fullWidth
                id='firstName'
                name='firstName'
                label='First Name'
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id='lastName'
                name='lastName'
                label='Last Name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id='location'
                name='location'
                label='Location'
                value={formik.values.location}
                onChange={formik.handleChange}
              />

            </div>


          </form>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
