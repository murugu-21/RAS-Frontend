import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { green, red, orange } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import printJS from "print-js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    //backgroundImage: `url(${'https://allfreedesigns.com/wp-content/uploads/2015/06/black-patterns-5.jpg'})`,
    overflow: "hidden",
    backgroundSize: "100%",
    margin: theme.spacing(0),
    padding: "0.8%",
  },
  gridList: {
    width: 1200,
    height: 750,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.8)",
  },
}));

export default function Tables() {
  const classes = useStyles();
  const [editCell, setEditcell] = useState();
  const [editTable, setEdittable] = useState();
  const [quantity, setQuantity] = useState();
  const [curTable, addCurTable] = useState("");
  const [tables, addTables] = useState([]);
  const [changes, setChanges] = useState("");

  const [dochanges, setdoChanges] = React.useState("");

  useEffect(() => {
    function updateTables() {
      if (localStorage.getItem("tables")) {
        addTables(JSON.parse(localStorage.getItem("tables")));
      }
    }
    updateTables();
  }, [tables]);

  useEffect(() => {
    setChanges(0);
  }, [changes]);

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("curTable", curTable);
    setdoChanges(1);
  }, [tables, curTable]);

  useEffect(() => {
    setdoChanges(0);
  }, [dochanges]);

  const handleSubmit = () => {
    if (curTable === null || curTable === "" || curTable <= 0) {
      alert("invalid Input");
      return;
    }

    localStorage.setItem("curTable", curTable);

    if (!tables.includes(curTable)) {
      let updateTables = tables;
      updateTables.push(curTable);
      addTables(updateTables);
      setChanges(1);
    }
    localStorage.setItem("tables", JSON.stringify(tables));
  };
  const handleChange = (event) => {
    addCurTable(event.target.value);
  };

  const SetCurTable = (table) => {
    addCurTable(table);
    localStorage.setItem("curTable", table);
  };

  const handleChange1 = (event) => {
    setQuantity(event.target.value);
  };

  const handleDoneIcon = (food, table) => {
    if (quantity != null && quantity > 0) {
      setEditcell("");
      setEdittable("");
      let food_list = JSON.parse(localStorage.getItem(table));
      food_list[food][2] = (food_list[food][2] / food_list[food][1]) * quantity;
      food_list[food][1] = parseInt(quantity);
      localStorage.setItem(table, JSON.stringify(food_list));
      window.location.reload();
    } else {
      alert("quantity given is invalid!!");
      window.location.reload();
    }
  };

  const deleteItem = (id, table) => {
    var food = JSON.parse(localStorage.getItem(table));
    delete food[id];
    localStorage.setItem(table, JSON.stringify(food));
  };

  const handleDeleteTable = (table) => {
    localStorage.removeItem(table);
    if (tables.length === 1) {
      let updateTables = [];
      addTables(updateTables);
    } else if (tables.indexOf(table) === 0) {
      let updateTables = tables;
      updateTables.shift();
      addTables(updateTables);
      addCurTable(tables[0]);
    } else {
      let updateTables = tables;
      updateTables.splice(tables.indexOf(table), tables.indexOf(table));
      addTables(updateTables);
      addCurTable(tables[0]);
    }
    localStorage.setItem("tables", JSON.stringify(tables));
    localStorage.setItem("curTable", curTable);
  };

  const generatebill = (table) => {
    axios
      .post(
        "http://localhost:8000/api/BillGenerator",
        {
          no: table,
          email: sessionStorage.getItem("email"),
          order: Object.values(JSON.parse(localStorage.getItem(table))),
        },
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        printJS(url);
      })
      .catch((error) => console.log(error));
  };

  const TableHeader = (table) => {
    return (
      <TableHead>
        <TableRow key={table + "no"}>
          <TableCell
            colSpan={3}
            align="center"
            onClick={() => {
              SetCurTable(table);
            }}
          >
            Table {" " + table}
          </TableCell>
          <TableCell>
            <CloseIcon
              style={{
                color: red[600],
                float: "right",
                fontSize: "30px",
                align: "right",
              }}
              onClick={() => handleDeleteTable(table)}
            />
          </TableCell>
        </TableRow>
        <TableRow key={table + "items"}>
          <TableCell>Food</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const Tablebody = (table) => {
    if (localStorage.getItem(table) !== null) {
      var arr = Object.values(JSON.parse(localStorage.getItem(table)));
      if (arr[0] != null) {
        return (
          <TableBody>
            {arr[0] &&
              arr.map((cell) => (
                <>
                  <TableRow key={cell[0]}>
                    <TableCell>{cell[0]}</TableCell>

                    {editCell === cell[0] && editTable === table ? (
                      <TableCell>
                        <TextField
                          type="number"
                          onChange={handleChange1}
                          style={{ float: "left", width: 30 }}
                        />
                        <span>
                          <CheckCircleIcon
                            style={{
                              color: green[600],
                              float: "right",
                              fontSize: "30px",
                              align: "right",
                            }}
                            onClick={() => handleDoneIcon(cell[0], table)}
                          />
                        </span>
                      </TableCell>
                    ) : (
                      <TableCell>
                        {cell[1]}
                        <span>
                          <EditIcon
                            style={{
                              color: orange[600],
                              float: "right",
                              fontSize: "30px",
                              align: "right",
                            }}
                            onClick={() => {
                              setEdittable(table);
                              setEditcell(cell[0]);
                            }}
                          />
                        </span>
                      </TableCell>
                    )}
                    <TableCell>{cell[2]}</TableCell>
                    <TableCell>
                      <Button color="secondary">
                        <DeleteIcon
                          onClick={() => deleteItem(cell[0], table)}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => generatebill(table)}
                >
                  <ReceiptIcon />
                  Generate Bill
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      }
    }
    return <TableBody></TableBody>;
  };

  return (
    <div>
      <TextField
        id="outlined-search"
        label="Add Table"
        type="number"
        onKeyUp={handleChange}
        onChange={handleChange}
        value={curTable}
        variant="outlined"
      />
      <span />
      <Button color="secondary" onClick={handleSubmit} variant="contained">
        Add Table
      </Button>
      {tables.map((table) => (
        <Paper className={classes.root}>
          <Table className={classes.table} key={table}>
            {TableHeader(table)}
            {Tablebody(table)}
          </Table>
        </Paper>
      ))}
    </div>
  );
}
