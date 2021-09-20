import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function createData(
  id,
  name,
  address,
  state,
  city,
  zip,
  missingData,
  missingCount
) {
  return { id, name, address, state, city, zip, missingData, missingCount };
}

const Main = () => {
  const [result, setResult] = useState([]);
  const rows = result.map((property) => {
    return createData(
      "",
      property.PROP_NAME,
      property.ADDRESS,
      property.CITY,
      property.STATE_ID,
      property.ZIP,
      property.MISSING_FIELD_COUNT,
      property.MISSING_DATA_ENCODING
    );
  });
  const handleFetching = async () => {
    await axios
      .get("http://localhost:5000/data")
      .then((data) => setResult(data.data));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Button
          style={{
            backgroundColor: "#4ecfca",
            cursor: "pointer",
            fontSize: 20,
            color: "white",
          }}
          variant="contained"
          onClick={handleFetching}
        >
          Fetch Data
        </Button>
        <Link
          style={{
            cursor: "pointer",
            fontSize: 20,
            color: "#4ecfca",
          }}
          className="navbar-brand"
          to="/display"
        >
          Component State
        </Link>
      </div>

      <div style={{ marginTop: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">ADDRESS&nbsp;</TableCell>
                <TableCell align="right">CITY&nbsp;</TableCell>
                <TableCell align="right">STATE&nbsp;</TableCell>
                <TableCell align="right">ZIP&nbsp;</TableCell>
                <TableCell align="right">MISSING DATA&nbsp;</TableCell>
                <TableCell align="right">MISSING COUNT&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.zip}</TableCell>
                  <TableCell align="right">{row.missingData}</TableCell>
                  <TableCell align="right">{row.missingCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Main;
