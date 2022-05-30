import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ModalPDF({ open, cb_handleClose, count }) {
 const defaultLayoutPluginInstance = defaultLayoutPlugin();

 return (
  <Modal
   open={open}
   onClose={() => cb_handleClose()}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
  // className="ml-[20vw] w-4/5"
  >
   <Box sx={style} className="absolute top-[50%] left-[50%] max-h-[100%]">
    {count.fileType !== "application/pdf" ? (
     <div className="flex justify-center">
      <img src={`https://kunc-medsos.herokuapp.com/${count.filePath}`} className="card-img-top img-responsive" alt="img" />
     </div>
    ) : (
     <div className="col-6 sm:w-screen md:w-[80vw] h-screen">
      <div className="card mb-2 border-0 p-0 " style={{
       border: '1px solid rgba(0, 0, 0, 0.3)',
       height: '750px',

      }}>
       <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
        <Viewer fileUrl={`https://kunc-medsos.herokuapp.com/${count.filePath}`}
         plugins={[defaultLayoutPluginInstance]}></Viewer>
       </Worker>
      </div>
     </div>
    )}
    <button onClick={() => cb_handleClose()} className="absolute right-1 top-1">
     <CloseIcon />
    </button>
   </Box>
  </Modal>
 );
}

const style = {
 transform: 'translate(-50%, -50%)',
 bgcolor: 'background.paper',
 border: '2px solid #000',
 boxShadow: 24,
 p: 4,
};