import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Products = () => {

  return (
    <>
    <h2>Products</h2>
    <Box sx={{mt:2}}>
        <Outlet />
    </Box>
    </>
  )
}

export default observer(Products)