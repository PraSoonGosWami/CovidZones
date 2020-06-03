import React from 'react'
import Style from './ContainmnetList.module.css'
import Nearbyzones from "../NearbyZones/Nearbyzones";

const ContainmnetList = (props) => {
    const data = props.data
    return (
        <div className={Style.Clist}>
            <p>Address: <strong>{data.address}</strong></p>
            <p>District: <strong>{data.containment[0].district}</strong></p>
            <p>District zone type: <strong>{data.containment[0].districtZoneType}</strong></p>
            {data.containment[0].containmentsAvailability ?
                (data.containment[0].inContainmentZone ?
                        <h5 className={Style.ClistZone+ " " + Style.ClistZoneDanger}>Seems like you are in a containment zone! Stay home, Stay safe!</h5>:
                        <h5 className={Style.ClistZone+ " " + Style.ClistZoneSafe}>Yay!! You are <strong>NOT</strong> in a containment zone</h5>

                )
                : <h4>Seems like we don't have containment zone data of your location</h4>
            }

            {data.nearby.length >0 && <Nearbyzones data={data.nearby}/>}

        </div>
    )
}

export default ContainmnetList