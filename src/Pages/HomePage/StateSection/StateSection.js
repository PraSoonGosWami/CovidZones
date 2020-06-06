import React, {useEffect, useState} from 'react'
import Style from './StateSection.module.css'
import AxiosInstance from '../../../Services/AxiosInstance'
import Typography from "@material-ui/core/Typography";
import StatsCards from "../../../UI/StatsCard/StatsCards";
import {getDateAndTime} from "../../../Utils/FormatDate";
import ZonesCard from "../../../UI/ZonesCard/ZonesCard";
import useAlert from "../../../Hooks/useAlert";

const StateSection = (props) => {

    const stateCode = props.stateCode
    const [stats, setStats] = useState(null)
    const [zones, setZones] = useState(null)
    const [deltaActive, setDeltaActive] = useState("")

    const { addAlert } = useAlert()

    useEffect(()=>{
        props.setLoading(true)
        AxiosInstance.get(`/stats/${stateCode}`)
            .then(res=>{
                setStats(res.data)
                const dc = +res.data[0].deltaconfirmed
                const dr = +res.data[0].deltarecovered
                const dd = +res.data[0].deltadeaths

                const da = dc - dr - dd
                da>=0 ? setDeltaActive("+"+da):setDeltaActive(da.toString())
            })
            .catch(error => {
                if(error.response){
                    addAlert(error.response.data.message,'error')
                }
            })
            .finally(()=>{
                stateCode === 'TT' && props.setLoading(false)
            })

        //gets district wise zone data
        stateCode!=="TT" && AxiosInstance.get(`/zones/${stateCode}`)
            .then(res=>{
                setZones(res.data)
            })
            .catch(error => {
                if(error.response){
                    addAlert(error.response.data.message,'error')
                }
            })
            .finally(()=>{
                props.setLoading(false)
            })


    },[stateCode])

    return(
        <div className={Style.StateSection} style={{animationDelay:"2s"}}>
            {
                stats &&
                <div className={Style.StateStats}>
                    <Typography variant={"h5"}>{stats["0"].state}</Typography>
                    <Typography variant={"h6"} color={"textSecondary"}>Last update {getDateAndTime(stats["0"].lastupdatedtime)} IST</Typography>

                    <header>
                        <StatsCards bgColor={"#F9C9C9"} color={"#EF2525"} title={"Confirmed"} number={stats["0"].confirmed} delta={"+"+stats["0"].deltaconfirmed}/>
                        <StatsCards bgColor={"#9EC2F8"} color={"#1558F3"} title={"Active"} number={stats["0"].active} delta={deltaActive} />
                        <StatsCards bgColor={"#A9D5A5"} color={"#0C4B05"} title={"Recovered"} number={stats["0"].recovered} delta={"+"+stats["0"].deltarecovered}/>
                        <StatsCards bgColor={"#A4A2A2"} color={"#090909"} title={"Death"} number={stats["0"].deaths} delta={"+"+stats["0"].deltadeaths} />
                    </header>
                </div>
            }
            {
               stats && zones &&
               <div className={Style.StateZones}>
                   <Typography variant={"h6"} >District wise zones</Typography>
                   <Typography color={"textSecondary"}>(For district wise cases visit <a
                           style={{textDecoration:"none",fontWeight:"bold",color:"rgba(56, 142, 60, 1)"}}
                           rel={"noopener noreferrer"}
                           href={"https://www.covid19india.org/"} target={"_blank"}>here</a>)
                   </Typography>
                   {zones.map(item => {
                       return <ZonesCard key={item.districtcode} district={item.district} bgColor={item.zone}/>
                   })}
               </div>
            }

        </div>
    )
}

export default StateSection
