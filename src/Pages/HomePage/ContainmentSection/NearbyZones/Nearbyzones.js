import React from 'react'
import Typography from "@material-ui/core/Typography";
import Style from  './Nearbyzones.module.css'
const Nearbyzones = (props) => {
    const data = props.data
    return(
        <div className={Style.NearbyZones}>
            <Typography variant={"h6"}>Containment zones near by</Typography>
            <ol>
                {data.map((item,index)=>{
                    return item !== "NA" && <li key={index}><p>{item}</p></li>

                })}
            </ol>
        </div>
    )
}

export default Nearbyzones
