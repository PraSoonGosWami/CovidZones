import React from 'react'
import Style from './StatsCard.module.css'
const StatsCards = (props) => {
    return(
        <div className={Style.StatsCard} style={{backgroundColor:props.bgColor}}>
            <p style={{color:props.color}}>{props.title}</p>
            <p style={{color:props.color}}>{props.number}</p>
            <p style={{color:props.color}}>{props.delta}</p>
        </div>
    )
}

export default StatsCards
