import React, {useEffect, useState} from 'react'
import Style from './StateSection.module.css'
import AxiosInstance from '../../../Services/AxiosInstance'
import Typography from "@material-ui/core/Typography";
import StatsCards from "../../../UI/StatsCard/StatsCards";
import {getDateAndTime} from "../../../Utils/FormatDate";
import ZonesCard from "../../../UI/ZonesCard/ZonesCard";

const StateSection = (props) => {

    const stateCode = props.stateCode
    const [stats, setStats] = useState(null)
    const [zones, setZones] = useState(null)

    useEffect(()=>{
        AxiosInstance.get(`/stats/${stateCode}`)
            .then(res=>{
                setStats(res.data)
            })
            .catch(err => {
            })

        AxiosInstance.get(`/zones/${stateCode}`)
            .then(res=>{
                setZones(res.data)
            })
            .catch(err => {

            })
    },[stateCode])

    return(
        <div className={Style.StateSection}>
            {
                stats &&
                <div className={Style.StateStats}>
                    <Typography variant={"h5"}>{stats["0"].state}</Typography>
                    <Typography variant={"h6"} color={"textSecondary"}>Last update {getDateAndTime(stats["0"].lastupdatedtime)} IST</Typography>

                    <header>
                        <StatsCards bgColor={"#F9C9C9"} color={"#EF2525"} title={"Confirmed"} number={stats["0"].confirmed}/>
                        <StatsCards bgColor={"#9EC2F8"} color={"#1558F3"} title={"Active"} number={stats["0"].active}/>
                        <StatsCards bgColor={"#A9D5A5"} color={"#0C4B05"} title={"Recovered"} number={stats["0"].recovered}/>
                        <StatsCards bgColor={"#A4A2A2"} color={"#090909"} title={"Death"} number={stats["0"].deaths}/>
                    </header>
                </div>
            }
            {
               zones &&
               <div className={Style.StateZones}>
                   <Typography variant={"h6"} >District wise zones</Typography>
                   {zones.map(item => {
                       return <ZonesCard key={item.districtcode} district={item.district} bgColor={item.zone}/>
                   })}
               </div>
            }

        </div>
    )
}

export default StateSection
