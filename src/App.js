import React, { useState, useEffect } from 'react';
import './App.css';
import FileUploadScreen from './screens/FileUploadScreen';
import { getSingleFiles, getMultipleFiles } from './data/api';
import TableList from './components/Table/TableList'

// import ModalPDF from './components/Modal/ModalPDF'

function App() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getSingleFileslist = async () => {
    try {
      const fileslist = await getSingleFiles();
      setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);

  console.log(singleFiles)
  return (
    <>
      <div className="flex p-5 flex-col items-center">
        <h3 className="font-bold">File Upload Using MERN Stack </h3>
        <FileUploadScreen getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()} />
      </div>
      <div className="">
        <div className="">
          <div className="">
            <h4 className="">Single Files List</h4>
            <div className="">
              <TableList data={singleFiles} modOpen={open} cb_handleOpen={handleOpen} cb_handleClose={handleClose} />
              {/* {singleFiles.map((file, index) => {
                if (file.fileType !== "application/pdf") {
                  return (
                    <div className="col-6">
                      <div className="card mb-2 border-0 p-0">
                        <img src={`http://localhost:8080/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="col-6">
                      <div className="card mb-2 border-0 p-0">
                        <iframe title="123" src={`http://localhost:8080/${file.filePath}`} ></iframe>
                      </div>
                    </div>
                  )
                }
              }
              )} */}
            </div>
          </div>
          {/* <div className="col-6">
            <h4 className="text-success font-weight-bold">Multiple Files List</h4>
            {multipleFiles.map((element, index) =>
              <div key={element._id}>
                <h6 className="text-danger font-weight-bold">{element.title}</h6>
                <div className="row">
                  {element.files.map((file, index) =>
                    <div className="col-6">
                      <div className="card mb-2 border-0 p-0">
                        <img src={`https://kunc-medsos.herokuapp.com/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>

      {/* <ModalPDF open={open} /> */}
    </>
  );
}

export default App;