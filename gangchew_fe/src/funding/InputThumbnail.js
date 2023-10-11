import React,{ useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import inputThumbnail from '../funding/css/inputThumbnail.css';

export default function InputThumbnail({name,handleInputChange}){

  /*mui이미지 업로드 버튼*/ 
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const [selectedImage, setSelectedImage] = useState(null);

      const imgHandler = (event) => {
        const file = event.target.files[0];
        const key = name;

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const imagePreviewURL = e.target.result;
            setSelectedImage(imagePreviewURL);
            handleInputChange(key, file);
        };

        reader.readAsDataURL(file);
        console.log(selectedImage);
    
        
      };
    }

    return(
        <div id='thumbContainer'>
            <div id='thumbImg'>
            {selectedImage && <img id='img' src={selectedImage} alt='' />}
            </div>
            
            <div id='thumbInput'>
            <Button style={{backgroundColor:'#701edb'}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" accept='image/*' onChange={imgHandler}/>
            </Button>
            </div>
        </div>
    )
};