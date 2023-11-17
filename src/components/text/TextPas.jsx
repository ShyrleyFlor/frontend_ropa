import { TextField } from "@mui/material";

function Textpas({ name, onChange }) {
  return (
    <>
      <TextField
        autoFocus
        onChange={onChange}
        name={name}
        fullWidth={true}
        variant="filled"
        style={{ margin: "15px 10px" }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </>
  );
}
export default Textpas;
