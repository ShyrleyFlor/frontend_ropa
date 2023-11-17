import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

function ButtonComponent({
  disabled=false,
  text,
  handleClick,
  small = true,
  children,
  variant = "contained",
  color = "primary",
  type = "button",
  startIcon,
}) {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      color={color}
      type={type}
      startIcon={startIcon}
      size="large"
      style={
        small
          ? {
              borderRadius: "10px",
              color: "null",
              // border: "1px solid #2F528F",
            }
          : {
              borderRadius: "20px",
              fontSize: "45px",
              padding: "15px 35px",
              // border: "2px solid #2F528F",
            }
      }
      onClick={handleClick}
    >
      {text}
      {children}
    </Button>
  );
}
export default ButtonComponent;
