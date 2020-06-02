import React from 'react'
import Typography from "@material-ui/core/Typography";

const ZonesCard = (props) => {
    const colors = {
        Red : "rgb(229,121,121)",
        Orange : "rgba(231,179,82,0.88)",
        Green : "#72af5f"
    }
    const textColor = {
        Red : "rgb(191,5,5)",
        Orange : "rgb(151,96,4)",
        Green : "#1b7105"
    }
    return(
        <div style={{backgroundColor:colors[props.bgColor],padding:"8px",margin:"10px 0", borderRadius:"4px"}}>
            <Typography variant={"h6"} style={{color:textColor[props.bgColor], fontWeight:"light", fontSize:"0.95em"}} >{props.district}</Typography>
        </div>
    )
}

export default ZonesCard
