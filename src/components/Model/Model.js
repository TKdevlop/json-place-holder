import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetvalue: () => setValue("")
  };
};
const updatePost = (props, title, body) => {
  props.updatePost(title.value, body.value, props.selectedPost.id);
  title.resetvalue();
  body.resetvalue();
};
export default function Model(props) {
  const title = useInputValue("");
  const body = useInputValue("");
  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.closeModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.selectedPost.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.selectedPost.body}
          </DialogContentText>
        </DialogContent>
        <TextField
          {...title}
          style={{ maxWidth: "90%", margin: "0 auto" }}
          id="standard-full-width"
          label="Title"
          placeholder="Enter Post Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          {...body}
          id="standard-full-width"
          label="Body"
          style={{ maxWidth: "90%", margin: "0 auto" }}
          placeholder="Enter Post body"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />
        <DialogActions>
          <Button onClick={props.closeModel} color="secondary">
            CANCEL
          </Button>
          <Button
            onClick={() => updatePost(props, title, body)}
            color="primary"
            autoFocus
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
