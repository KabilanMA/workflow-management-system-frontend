import React, { useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer,toast} from 'react-toastify'
import './drop-file-input.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { ImageConfig } from '../ImageConfig'; 
import uploadImg from './cloud-upload-regular-240.png';



const DropFileInput = props => {
    const axios = useAxiosPrivate();
    const UPLOADFILES_URL=`/fileUpload/multiple`;

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [title,setTitle]=useState(["Hiniduma Lake Project"]);
    const[sentStatus,setSentStatus]=useState(false);
    console.log("checking Ini");
    console.log(sentStatus);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }
 
    const uploadFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < fileList.length; i+=1) {
            formData.append('files', fileList[i]);                      
        }
        const result=await axios.post(UPLOADFILES_URL,formData);
        console.log(result.status);
        if(result.status===201){
            setSentStatus(true)
            toast.success("Succefully Sent");
        }
        else{
            toast.error("Try Again");}
        }
      

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig.default} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <Button style={{borderRadius: '50%'}} variant="outlined" color="error" className="drop-file-preview__item__del" onClick={() =>{ fileRemove(item)}}> x</Button>
                                </div>
                            ))
                        }
                       <Button onClick={()=>{
                        if(!sentStatus){
                           
                            uploadFiles();
                        }
                        else{
                           
                            toast.error("Already Sent");
                        }
                        
                       }} variant="contained" className="send-Drop-but" endIcon={(!sentStatus) ? <SendIcon/> : <CheckIcon/>}>
  {sentStatus ? "sent" :"send selected files"}
</Button>
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
