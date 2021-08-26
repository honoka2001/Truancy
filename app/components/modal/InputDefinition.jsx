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

const definitionRepository = RepositoryFactory.get("definitions");

export default function InputDefinition(props) {
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

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [colorId, setColorId] = useState("");
  const [colors, setColors] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };
  const handleColorChange = (e) => {
    setColorId(e.target.value);
  };

  const getColors = async () => {
    try {
      axios.get("http://localhost:3000/colors").then(function (res) {
        setColors(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await definitionRepository.post({
        definition: {
          user_id: props.userId,
          name: name,
          detail: detail,
          color_id: colorId,
        },
      });
      console.log(res);
      props.handleClickDefinitionClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
  }, [props.userId]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClickDefinitionClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Definition</DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.chip}
            id="standard-basic"
            label="Definition Name"
            onChange={handleNameChange}
          />
          <TextField
            className={classes.chip}
            id="standard-basic"
            label="Detail"
            onChange={handleDetailChange}
          />
          <InputLabel id="demo-mutiple-checkbox-label" style={{ top: 135 }}>
            Color
          </InputLabel>
          <Select
            className={classes.chip}
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            value={colors.id}
            onChange={handleColorChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {colors.map((data) => (
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
                  <ListItemText primary={data.name} />
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <div
          style={{ width: 300, margin: "-5px auto 10px auto", display: "flex" }}
        >
          <div style={{ width: 141, height: 1 }}></div>
          <Button
            onClick={props.handleClickDefinitionClose}
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
        </div>
      </DialogActions>
    </Dialog>
  );
}
