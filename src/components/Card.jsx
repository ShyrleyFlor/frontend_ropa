import { Card, Box } from "@mui/material";

function CardApp({ children }) {
  return (
    <Card
      style={{
        borderRadius: "20px",
        backgroundColor: "#BDE0FE",
        width: "350px",
        height: "650px",
        display: "flex",
        justifyContent: "center",
        border: "3px solid #2F528F",
      }}
    >
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        alignItems="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {children}
      </Box>
    </Card>
  );
}

export default CardApp;
