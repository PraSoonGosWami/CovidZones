import React from 'react'
import Style from './HomePage.module.css'
import StateSection from "./StateSection/StateSection";
import Containment from "./ContainmentSection/Containment";
const HomePage = (props) => {
    return(
        <div className={Style.HomePage}>
            <StateSection stateCode={props.stateCode}/>
            <Containment/>
        </div>
    )
}

export default HomePage
