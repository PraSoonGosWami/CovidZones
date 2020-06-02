import React from 'react'
import Typography from "@material-ui/core/Typography";
import Style from './Containment.module.css'
const Containment = (props) => {
    return(
        <div className={Style.Containment}>
            <Typography variant={"h5"}>Check if you are in a containment zone</Typography>
        </div>
    )
}

export default Containment
