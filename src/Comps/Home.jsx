import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NoteIcon from "@material-ui/icons/Note";
import { Redirect } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";
import Note from "./note";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
let valugf = 1;
const Home = () => {
  const [values, setValues] = useState({
    name: "",
    uid: "",
    textpad: "",
    titlepad: "",
    datanote: [],
    userstate: Cookies.get("userLoginState"),
    state: true,
    expandtitlediv: false,
    getdatastate: true,
  });

  const classes = useStyles();

  useEffect(() => {
    if (values.state) {
      getdata();
    }
  });
  // const getdata1 = async () => {
  //   await getnotes()

  // }
  const getdata = () => {
    if (valugf === 1) {
      getnotes();
      valugf = valugf + 1;
    }
    setValues({
      ...values,
      name: Cookies.get("name"),
      uid: Cookies.get("uid"),
      userstate: Cookies.get("userLoginState"),
      state: false,
      getdatastate: false,
    });
  };

  const logout = () => {
    Cookies.remove("userLoginState");
    Cookies.remove("name");
    Cookies.remove("uid");
    setValues({
      ...values,
      userstate: false,
    });
  };

  const handleChangetextpad = (event) => {
    setValues({ ...values, textpad: event.target.value });
  };
  const handleChangetitle = (event) => {
    setValues({ ...values, titlepad: event.target.value });
  };

  const savedata = () => {
    const date = new Date().toLocaleString();
    Axios.post("http://192.168.43.26:5055/api/savenotes", {
      uid: values.uid,
      title: values.titlepad,
      date: date,
      note: values.textpad,
    }).then((response) => {
      getnotesave();
    });
  };

  const getnotes = () => {
    const uid = Cookies.get("uid");
    Axios.post("http://192.168.43.26:5055/api/getnotes", {
      uid: uid,
    }).then((response) => {
      setValues({ ...values, datanote: response.data });
      console.log("respone", response.data);
    });
  };

  const getnotesave = () => {
    var uidd;
    if (values.uid) {
      uidd = values.uid;
    } else {
      uidd = Cookies.get("uid");
    }
    Axios.post("http://192.168.43.26:5055/api/getnotes", {
      uid: uidd,
    }).then((response) => {
      setValues({
        ...values,
        expandtitlediv: false,
        textpad: "",
        titlepad: "",
        datanote: response.data,
      });
    });
  };
  const deletenote = (e) => {
    Axios.post("http://192.168.43.26:5055/api/deletenotes", {
      uid: e,
    }).then((response) => {
      console.log("key-------->", e);
      getnotes();

      setValues({
        ...values,
        name: Cookies.get("name"),
        uid: Cookies.get("uid"),
      });
    });
  };

  const expandtitle = () => {
    setValues({ ...values, expandtitlediv: true });
  };
  const collapsetitle = () => {
    setValues({ ...values, expandtitlediv: false });
  };
  if (values.userstate) {
    return (
      <div
        className="Home"
        style={{
          width: "100%",

          height: 600,
        }}
      >
        <div className="Header" style={{ position: "relative" }}>
          <NoteIcon style={{ fontSize: 25 }} className="noteicon" />
          <span style={{ fontSize: 25 }} className="headname1">
            NOTES
          </span>
          <span style={{ fontSize: 25 }} className="headname2">
            MATE
          </span>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ float: "right", marginTop: 0 }}
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={logout}
          >
            LOGOUT
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            height: "auto",
            alignItems: "center",
            background: "#e3f5ff",
            paddingBottom: 20,
            paddingTop: 20,
          }}
          onDoubleClick={collapsetitle}
        >
          <span style={{ fontSize: 22 }}> Hello' {values.name}</span>
          <div
            className="Addnotes"
            style={{
              margin: "50px auto",
              marginTop: 5,
              padding: 10,
              borderRadius: 25,
              position: "relative",
              background: "#fff",
              maxWidth: 300,
              Height: "auto",
              boxShadow: "5px 5px 15px #888888",
            }}
            onDoubleClick={collapsetitle}
          >
            <form className={classes.root} noValidate autoComplete="off">
              <Input
                placeholder="Title"
                style={{ width: "90%", fontSize: 22 }}
                onClick={expandtitle}
                value={values.titlepad}
                inputProps={{ "aria-label": "description" }}
                onChange={handleChangetitle}
              />
              {values.expandtitlediv ? (
                <TextField
                  id="standard-multiline-flexible"
                  label="Note"
                  multiline
                  value={values.textpad}
                  rowsMax={5}
                  style={{ width: "90%" }}
                  onChange={handleChangetextpad}
                />
              ) : null}
            </form>
            {values.expandtitlediv ? (
              <Fab
                style={{ float: "right" }}
                size="medium"
                color="primary"
                variant="extended"
                aria-label="add"
                onClick={savedata}
              >
                SAVE
                <SaveIcon />
              </Fab>
            ) : null}
          </div>

          <div
            className="datadivcont"
            style={{
              alignItems: "flex-start",
              display: "flex",
              flexWrap: "wrap",
            }}
            onClick={collapsetitle}
          >
            {values.datanote.map((item, i) => (
              <Note
                key={item.id}
                title={item.title}
                note={item.note}
                id={item.id}
                deletenote={deletenote}
              />
            ))}
          </div>
        </div>

        <div className="Footer" style={{ position: "relative" }}>
          Copyright © 2020 All rights reserved
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Home;
