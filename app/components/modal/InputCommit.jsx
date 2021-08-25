import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";

import axios from "axios";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const commitRepository = RepositoryFactory.get("commits");

export default function InputCommit(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
      maxWidth: 500,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: "10px 0px",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles();

  const [definitions, setDefinitions] = useState([]);
  const [definitionId, setDefinitionId] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(1);

  const handleDefinitionChange = (e) => {
    setDefinitionId(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleCountChaneg = (e) => {
    setCount(e.target.value);
  };

  const definitionPost = (userId) => {
    try {
      axios
        .get("http://localhost:3000/definitions", {
          params: {
            id: userId,
          },
        })
        .then(function (res) {
          console.log(res.data);
          setDefinitions(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    definitionPost(props.userId);
  }, [props.userId]);

  const handleSubmit = async (e) => {
    console.log(definitionId);
    console.log(message);
    console.log(date);
    console.log(count);
    e.preventDefault();
    try {
      const res = await commitRepository.post({
        commit: {
          user_id: props.userId,
          definition_id: definitionId,
          message: message,
          date: date,
          count: count,
        },
      });
      console.log(res);
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Commit</DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Definition</InputLabel>
          <Select
            className={classes.chip}
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            value={definitions.name}
            onChange={handleDefinitionChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {definitions.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      backgroundColor: data.code,
                      width: 4,
                      height: 20,
                      margin: "5px 5px 0 0",
                    }}
                  ></div>
                  <ListItemText primary={data.definitions_name} />
                </div>
              </MenuItem>
            ))}
          </Select>
          <TextField
            className={classes.chip}
            id="standard-basic"
            label="Commit Message"
            onChange={handleMessageChange}
          />
          <TextField
            className={classes.chip}
            id="standard-number"
            label="count"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue="1"
            onChange={handleCountChaneg}
          />
          <input
            type="date"
            defaultValue={new Date()}
            onChange={handleDateChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
