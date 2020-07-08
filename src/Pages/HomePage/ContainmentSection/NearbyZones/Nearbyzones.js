import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Style from  './Nearbyzones.module.css'
import AxiosInstance from '../../../../Services/AxiosInstance'
import useAlert from "../../../../Hooks/useAlert";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import {number} from "prop-types";

const Nearbyzones = (props) => {
    const location = props.location
    localStorage.setItem("loc",JSON.stringify(location))
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [radius, setRadius] = useState(5000)
    const {addAlert} = useAlert()

    useEffect(()=>{
        const nearby = localStorage.getItem("nearby")
        const rad = localStorage.getItem("radius")
        const loc = localStorage.getItem("loc")

        if(loc && loc === JSON.stringify(location) ){
            if(nearby){
                setData(JSON.parse(nearby))
                if(rad)
                    setRadius(JSON.parse(rad))
            }
            return
        }

        getNearbyZones()
    },[])

    //fetches near by zones from backend
    const getNearbyZones = () => {
        if(radius > 5000){
            setRadius(5000)
        }
        setLoading(true)
        const data = {location,radius:radius||2000}
        AxiosInstance.post('/check/nearbyzones',data)
            .then(res => {
                setData(res.data)
                localStorage.setItem("nearby",JSON.stringify(res.data))
                localStorage.setItem("radius",JSON.stringify(radius))
            })
            .catch(error => {
                if (error.response) {
                    addAlert(error.response.data.message, 'error')
                    return
                }
                addAlert(error.toString(), 'error')
            })
            .finally(()=> setLoading(false))
    }

    const updateRadius = () => {
        if(radius > 5000 || radius<=0){
            setRadius(5000)
        }
        getNearbyZones()
    }
    return(
        <div className={Style.NearbyZones}>
            <Typography variant={"h6"}>Containment zones near by</Typography>
            {loading && <LinearProgress color={"secondary"}/>}
            <header>
                <TextField
                    label="within radius"
                    id="outlined-start-adornment"
                    size={"small"}
                    color={"secondary"}
                    type={"number"}
                    value={radius}
                    helperText={"Max:5000m"}
                    fullWidth
                    onChange={(event)=> setRadius(+event.target.value)}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">in meter</InputAdornment>,
                        endAdornment :
                            <IconButton onClick={updateRadius} color={"secondary"} type="submit">
                                <DoneIcon color={"secondary"}/>
                            </IconButton>
                    }}
                    variant="outlined"
                />

            </header>
            {data && data.length>0 && <ol>
                {data.map((item, index) => {
                    return item !== "NA" && <li key={index}><p>{item}</p></li>
                })}
            </ol>}
            {data && data.length===0 && <div>
                <Typography style={{padding: "12px"}}>There are no containment zones within {radius}M from your location</Typography>
            </div>}
        </div>
    )
}

export default Nearbyzones
