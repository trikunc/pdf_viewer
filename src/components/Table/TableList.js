
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Visibility } from '@mui/icons-material';
import { useState } from 'react';

import ModalPDF from '../Modal/ModalPDF'



const columns = [
  { id: 'count', label: 'No', width: '5%' },

  {
    id: 'fileName',
    label: 'File Name',
    align: 'center',
    alignItem: 'left',
    // width: '70%',
    // minWidth: 400,
  },
  {
    id: 'fileSize',
    label: 'Size',
    align: 'center',
    alignItem: 'left',
    // width: '70%',
    // minWidth: 400,
  },
  {
    id: 'createdAt',
    label: 'Created At',
    align: 'center',
    alignItem: 'left',
    // width: '70%',
    // minWidth: 400,
  },
  {
    id: 'action',
    label: 'Aksi',
    width: '10%',
    marginHorizontal: 5,
    align: 'center',
  },
];


export default function TableAsset({ data, modOpen, cb_handleOpen, cb_handleClose }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (row) => {
    setCount(row)
    handleOpen()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width, backgroundColor: column.bgColor }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (

                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id !== 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'count'
                              ? index + 1
                              : value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="px-5"
                          >
                            <div className="flex flex-col items-center justify-end ">

                              <button onClick={() => handleClick(row)} className="rounded bg-actionred p-1 w-24 border hover:bg-blue-400 hover:text-white" >
                                <Visibility sx={{ fontSize: 18 }} /> View
                              </button>

                              {/* <button className="rounded bg-secondaryblue p-1 w-24 mr-1 ml-1 border hover:bg-red-500 hover:text-white" >
                                <Delete sx={{ fontSize: 18 }} /> Hapus
                              </button> */}
                            </div>
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPDF open={open} cb_handleClose={handleClose} count={count} />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}