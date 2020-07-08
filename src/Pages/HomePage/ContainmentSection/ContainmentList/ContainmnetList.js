import React from 'react'
import Style from './ContainmnetList.module.css'
import Nearbyzones from "../NearbyZones/Nearbyzones";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {formatDateAndTime} from "../../../../Utils/FormatDate";
import Alert from "@material-ui/lab/Alert";

const ContainmnetList = (props) => {
    const data = props.data

    return (
        <div className={Style.Clist}>
            <header>
                {data.lastUpdated &&
                <Typography color={"textSecondary"}>Last fetched {formatDateAndTime(data.lastUpdated)}</Typography>}
                <Button onClick={() => props.onClearButtonClickHandler()} color={"secondary"} variant={"text"}
                        size={"small"}>Clear</Button>
            </header>
            <p>Address: <strong>{data.address}</strong></p>
            <p>District: <strong>{data.containment[0].district}</strong></p>
            {data.containment[0].districtZoneType && <p>District zone type: <strong>{data.containment[0].districtZoneType}</strong></p>}
            {
                data.containment[0].inContainmentZone ?
                    <Alert className={Style.ClistZone} severity={'warning'} variant="filled"
                           onClose={props.onClose}>
                        Seems like you are in a containment zone! Stay home, Stay safe!
                    </Alert> :
                    <Alert className={Style.ClistZone} severity={'success'} variant="filled"
                           onClose={props.onClose}>
                        You are <strong>NOT</strong> in a containment zone, check maps to get more info near you.
                    </Alert>
            }

            {data && <Nearbyzones location={data.geoCode}/>}

        </div>
    )
}

export default ContainmnetList
