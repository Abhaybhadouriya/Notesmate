import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";


function Note(props) {
  const deletenote = () => {
    props.deletenote(props.id);
  };
  const [values, setValues] = React.useState({
    edit: true,
    textpad: props.note,
    id: props.id,
    titlepad: props.title,
  });

  const editbox = () => {
    setValues({ ...values, edit: false });
  };

  const handleChangetextpad = (event) => {
    setValues({ ...values, textpad: event.target.value });
  };
  const handleChangetitle = (event) => {
    setValues({ ...values, titlepad: event.target.value });
  };
  const cancleedit = () => {
    setValues({
      ...values,
      edit: true,
      textpad: values.textpad,
      titlepad: values.titlepad,
    });
  };

  const editnote = () => {
    Axios.post("http://192.168.43.26:5055/api/editnotes", {
        id: values.id,
        title:values.titlepad,
        note:values.textpad,
      }).then((response) => {
         setValues({...values,edit:true,titlepad:response.data.title,textpad:response.data.note})
        //  console.log("Response",response.data/)
      });
  };
  return values.edit ? (
    <div
      className="datadivcont"
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        className="datadiv"
        style={{
          boxShadow: "5px 5px 15px #888888",
          padding: 10,
          margin: 10,
          maxWidth: 250,
          height: "auto",
          borderRadius: 15,
          background: "#ffffff",
        }}
      >
        <span name="title" style={{ fontFamily: "serif", fontSize: 22 }}>
          {" "}
          {values.titlepad}
        </span>
        <p name="notesp" style={{ fontFamily: "serif", fontSize: 16 }}>
          {values.textpad}
        </p>
        <div className="datadivinner">
          <Fab
            size="medium"
            style={{ margin: 2, float: "right" }}
            color="secondary"
            aria-label="like"
            // value={"example"}
            onClick={deletenote}
          >
            <DeleteForeverIcon />
          </Fab>
          <Fab
            size="medium"
            style={{ margin: 2, float: "right" }}
            color="primary"
            aria-label="edit"
            onClick={editbox}
          >
            <EditIcon />
          </Fab>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="datadivcont"
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        className="datadiv"
        style={{
          boxShadow: "5px 5px 15px #888888",
          padding: 10,
          margin: 10,
          maxWidth: 250,
          height: "auto",
          borderRadius: 15,
          background: "#ffffff",
        }}
      >
        <Input
          placeholder="Title"
          style={{ width: "90%", fontSize: 22 }}
          value={values.titlepad}
          inputProps={{ "aria-label": "description" }}
          onChange={handleChangetitle}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Note"
          multiline
          value={values.textpad}
          rowsMax={5}
          style={{ width: "90%" }}
          onChange={handleChangetextpad}
        />
        <div className="datadivinner">
          <Fab
            size="medium"
            style={{ margin: 2, float: "right" }}
            color="secondary"
            aria-label="like"
            // value={"example"}
            onClick={editnote}
          >
            <SaveIcon />
          </Fab>
          <Fab
            size="medium"
            style={{ margin: 2, float: "right" }}
            color="primary"
            aria-label="edit"
            onClick={cancleedit}
          >
            <ClearIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
}

export default Note;
