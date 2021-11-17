import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Action() {
  const [user, setUser] = useState([]);
  const fetListUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/user/");
    setUser(res.data);
  };
  const handleDelete = async (e, ID) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:5000/api/v1/user/${ID}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetListUsers();
    console.log(user);
  }, []);
  useEffect(() => {}, [user]);
  return (
    <TableContainer className="mt-5 container" component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>

              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="left">{row.Address}</TableCell>
              <TableCell align="left">{row.Email}</TableCell>
              <TableCell align="left">
                <Button onClick={(e) => handleDelete(e, row.ID)}>
                  {" "}
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
