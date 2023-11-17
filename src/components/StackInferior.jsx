import { Stack } from '@mui/material';
import React from 'react'

export const StackInferior = ({children}) => {
  return (
    <Stack
          direction="row"
          spacing={1}
          p={3}
          justifyContent="flex-end"
          position="fixed"
          bottom={0}
          left={0}
          right={0}

        >
            {children}
        </Stack>
  )
}

export default StackInferior;