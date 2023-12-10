import { Box, Collapse, Alert, IconButton, Button, AlertTitle } from '@mui/material';
import React from 'react'
import { useStore } from '../../store/rootStore';
import CloseIcon from '@mui/icons-material/Close';
import { observer } from 'mobx-react-lite';

const AppAlert = () => {

    const { rootStore: { alertStore } } = useStore();
    const { isAletOpen, alertData,close} = alertStore
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={isAletOpen}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={alertData?.status}
                >
                    <AlertTitle>{alertData?.status.toUpperCase() ?? 'ERROR'}</AlertTitle>
                    {alertData?.message}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default observer(AppAlert)