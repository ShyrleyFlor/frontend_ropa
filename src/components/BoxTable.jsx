import { Box, Paper, Table, TableContainer } from '@mui/material'
import React from 'react'

const BoxTable = ({children}) => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    marginTop={2}
    marginBottom={10}
  >
    <Paper
      style={{
        display: "flex",
      }}
    >
      <TableContainer align="center" display="flex">
       
        {children}
      </TableContainer>
    </Paper>
  </Box>
  )
}

export default BoxTable