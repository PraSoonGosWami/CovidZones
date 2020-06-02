import React from 'react'
import Style from './HomePage.module.css'
import StateSection from "./StateSection/StateSection";
const HomePage = (props) => {
    return(
        <div className={Style.HomePage}>
            <StateSection stateCode={props.stateCode}/>
        </div>
    )
}

export default HomePage
