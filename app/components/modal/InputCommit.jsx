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
import InputDefinition from "./InputDefinition";

const commitRepository = RepositoryFactory.get("commits");

export default function InputCommit(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
      maxWidth: 500,
    },
    // dialog_padding: {
    //   padding: 20,
    // },
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
    btn_new_definition: {
      color: "rgb(255, 255, 255)",
      backgroundColor: theme.palette.primary.main,
      boxShadow: `4px 4px 8px 0 ${theme.palette.primary.lighter}`,
      margin: "0 0 0 0",
      fontSize: "calc(0.8rem - 2px)",
      "&:hover": {
        color: "rgb(255, 255, 255)",
        backgroundColor: theme.palette.primary.dark,
        boxShadow: "none",
      },
    },
    btn_dialog_action: {
      padding: 0,
      fontSize: "calc(1rem - 4px)",
      marginLeft: 12,
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
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  const [date, setDate] = useState(year + "-" + month + "-" + day);
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

  const [definitionOpen, setDefinitionOpen] = useState(false);

  const handleClickDefinitionOpen = () => {
    setDefinitionOpen(true);
  };
  const handleClickDefinitionClose = () => {
    definitionPost(props.userId);
    setDefinitionOpen(false);
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
      className={classes.dialog_padding}
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
            InputProps={{ inputProps: { min: 1, step: "1" } }}
          />
          <input type="date" value={date} onChange={handleDateChange} />
        </FormControl>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <div style={{ width: 300, margin: "-5px auto 10px auto" }}>
          <Button
            variant="contained"
            startIcon={<img src="AddIcon.svg" />}
            onClick={handleClickDefinitionOpen}
            className={classes.btn_new_definition}
          >
            New Definition
          </Button>
          <Button
            onClick={props.handleClose}
            color="primary"
            className={classes.btn_dialog_action}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            className={classes.btn_dialog_action}
          >
            Subscribe
          </Button>
          <InputDefinition
            open={definitionOpen}
            handleClickDefinitionClose={handleClickDefinitionClose}
            userId={props.userId}
            definitionPost={definitionPost}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
}
