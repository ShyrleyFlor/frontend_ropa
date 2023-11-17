import { Box, Typography } from "@mui/material"

const Logo = () => {
  return (
    <>
    <Box
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(50%, -50%)",
          left: 0,
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Multitienda
          <br />
          BM
        </Typography>
      </Box>
    </>
  )
}

export default Logo