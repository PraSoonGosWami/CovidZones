import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

const NotificationDialog = (props) => {

    return(
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Important updates</DialogTitle>
            <DialogContent style={{marginRight:"8px"}}>
                <ul style={{padding: "0 0 0 16px" }}>
                    {props.notifications.map(item => {
                        return <li style={{marginBottom:"4px"}} key={item.id}>{item.message}</li>
                    })}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Dismiss
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NotificationDialog
