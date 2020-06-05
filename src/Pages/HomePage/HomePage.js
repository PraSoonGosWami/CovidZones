import React, {useState} from 'react'
import Style from './HomePage.module.css'
import StateSection from "./StateSection/StateSection";
import Containment from "./ContainmentSection/Containment";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
const HomePage = (props) => {
    const [loading , setLoading] = useState(true)
    return(
        <div className={Style.HomePage}>
            {loading && <ProgressBar/>}
            <StateSection setLoading={setLoading} stateCode={props.stateCode}/>
            {!loading && <Containment/>}
        </div>
    )
}

export default React.memo(HomePage)
