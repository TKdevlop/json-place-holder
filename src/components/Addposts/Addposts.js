import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetvalue: () => setValue("")
  };
};
export default function Addposts({ onSubmit }, ref) {
  const title = useInputValue("");
  const body = useInputValue("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(title.value, body.value);
        title.resetvalue();
        body.resetvalue();
      }}
      style={{ maxWidth: "60%", margin: "0 auto", padding: 30 }}
    >
      <TextField
        {...title}
        id="standard-full-width"
        label="Title"
        style={{ margin: 8 }}
        placeholder="Enter Post Title"
        helperText="post tille"
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
        style={{ margin: 8 }}
        placeholder="Enter Post body"
        helperText="post body"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button
        type="submit"
        fullWidth
        style={{ fontSize: 24, textAlign: "center" }}
        color="primary"
      >
        ADD POST
      </Button>
    </form>
  );
}
