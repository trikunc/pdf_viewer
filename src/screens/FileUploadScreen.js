import React, { useState } from 'react';
import { singleFileUpload, multipleFilesUpload } from '../data/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileUploadScreen = (props) => {
 const [singleFile, setSingleFile] = useState('');
 const [multipleFiles, setMultipleFiles] = useState('');
 const [title, setTitle] = useState('');
 const [singleProgress, setSingleProgress] = useState(0);
 const [multipleProgress, setMultipleProgress] = useState(0);

 const SingleFileChange = (e) => {
  setSingleFile(e.target.files[0]);
  setSingleProgress(0);
 }
 const MultipleFileChange = (e) => {
  setMultipleFiles(e.target.files);
  setMultipleProgress(0);
 }
 const singleFileOptions = {
  onUploadProgress: (progressEvent) => {
   const { loaded, total } = progressEvent;
   const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
   setSingleProgress(percentage);
  }
 }
 const mulitpleFileOptions = {
  onUploadProgress: (progressEvent) => {
   const { loaded, total } = progressEvent;
   const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
   setMultipleProgress(percentage);
  }
 }
 const uploadSingleFile = async () => {
  const formData = new FormData();
  formData.append('file', singleFile);
  await singleFileUpload(formData, singleFileOptions);
  props.getsingle();
 }
 const UploadMultipleFiles = async () => {
  const formData = new FormData();
  formData.append('title', title);
  for (let i = 0; i < multipleFiles.length; i++) {
   formData.append('files', multipleFiles[i]);
  }
  await multipleFilesUpload(formData, mulitpleFileOptions);
  props.getMultiple();
 }
 return (
  <div className="flex flex-row  w-[60%]">
   <div className="p-10 w-[100%] flex flex-row justify-between">
    <div className="flex flex-col  justify-center">
     <div className="p-3">
      <label>Select Single File</label>
      <input type="file" className="ml-3 " onChange={(e) => SingleFileChange(e)} />
     </div>

     <div className="m-3">
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => uploadSingleFile()} >Upload</button>
     </div>
    </div>
    <div className="w-24">
     <CircularProgressbar
      value={singleProgress}
      text={`${singleProgress}%`}
      styles={buildStyles({
       rotation: 0.25,
       strokeLinecap: 'butt',
       textSize: '16px',
       pathTransitionDuration: 0.5,
       pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
       textColor: '#f88',
       trailColor: '#d6d6d6',
       backgroundColor: '#3e98c7',
      })}
     />
    </div>
   </div>
  </div>
 );
}

export default FileUploadScreen;