import React, {useState} from 'react'
import Fab from "@material-ui/core/Fab";
import MapIcon from "@material-ui/icons/Map";
import MapsDialog from "../../UI/MapsDialog/MapsDialog";

const MapComponent = (props) => {
    //map dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'fixed',
        bottom: '20px',
        right: '16px'
    }
    return (
        <div>
            <Fab
                variant={"extended"}
                style={style}
                onClick={handleClickOpen}
                size="medium"
                color="secondary" aria-label="open map"
            >
                <MapIcon style={{marginRight: "8px"}}/>
                Covid map
            </Fab>
            <MapsDialog open={open} handleClose={handleClose}/>
        </div>
    )
}

export default React.memo(MapComponent)
