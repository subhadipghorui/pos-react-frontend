import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Customers = () => {

  return (
    <>
    <h2>Customers</h2>
    <Box sx={{mt:2}}>
        <Outlet />
    </Box>
    </>
  )
}

export default observer(Customers)