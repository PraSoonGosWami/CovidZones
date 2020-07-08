import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AppLogo from "../../Assets/logo.png";
import Map from "../../Utils/Map";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'sticky',
    },
    logo: {
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    img: {
        width: "36px",
        marginRight: "12px"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MapsDialog = (props) => {

    const classes = useStyles();
    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <div className={classes.logo}>
                        <img className={classes.img} src={AppLogo} alt={"App logo"}/>
                        <Typography variant="h6">Maps</Typography>
                    </div>
                    <IconButton edge={"end"} color="secondary" onClick={props.handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
            <div style={{height: "100%"}}>

                <Map
                    height={"100%"}
                    center={[28.61, 77.23]}
                    zoom={9}
                    zoomControl={true}
                    hybrid={false}
                    search={true}
                />
            </div>



        </Dialog>

    );
}

export default React.memo(MapsDialog)
