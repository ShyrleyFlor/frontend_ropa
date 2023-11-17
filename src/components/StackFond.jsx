import { Stack } from '@mui/material'
import React from 'react'

const StackFond = ({children}) => {
  return (
    <Stack
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    bgcolor="#f3f6f9"
    m={-1}
    >
      {children}
    </Stack>
  )
}

export default StackFond