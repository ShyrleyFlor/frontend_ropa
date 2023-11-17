import { TextField } from "@mui/material";

function Text({ DefaultValue, name,onChange }) {
  return (
    <>
      <TextField
        onChange={onChange}
        name={name}
        size="large"
        fullWidth={true}
        variant="filled"
        id="username-input"
        label="Usuario"
        value={DefaultValue}
        // defaultValue={DefaultValue}
        style={{ margin: "15px 10px", fontSize: "2rem" }}
      />
    </>
  );
}

export default Text;
