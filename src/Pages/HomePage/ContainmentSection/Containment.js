import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Style from './Containment.module.css'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import LoacationIcon from '@material-ui/icons/MyLocation';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';
import AxiosInstance from '../../../Services/AxiosInstance'
import SearchResCard from "../../../UI/SearchResCard/SearchResCard";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContainmnetList from "./ContainmentList/ContainmnetList";
import useAlert from "../../../Hooks/useAlert";

const Containment = () => {
    const [darkMode, setDarkMode] = useState(false)
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            marginTop:"32px",
            backgroundColor: darkMode? "rgba(33, 33, 33, 1)": "rgba(242, 242, 242, 1)",
            },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,

        },
    }));
    const classes = useStyles();

    const [query, setQuery] = useState("")
    const [queryRes, setQueryRes] = useState(null)
    const [containmentRes, setContainmentRes] = useState(null)
    const [loading, setLoading] = useState(false)
    const dark = localStorage.getItem("dark")

    const { addAlert } = useAlert()

    useEffect(()=>{
        dark === "Y" ? setDarkMode(true) : setDarkMode(false)
    },[dark])

    //loads last detected containment zone data
    useEffect(()=>{
        const containmentData = localStorage.getItem("containmentData")
        if(containmentData){
            setContainmentRes(JSON.parse(containmentData))
            window.scrollTo(0,0)
        }
    },[])

    //on search bar text change handler
    const onTextChanged = (event) => {
        setQuery(event.target.value)
        if(query.length===0){
            setQueryRes(null)
        }
    }

    //get search result from backend
    const getQueryRes =() =>{
        if(query.length === 0){
            addAlert("Please enter the search string",'error')
            return
        }
        const data = {query}
        setQueryRes([{address:"Searching...",geo:{lat:404}}])
        AxiosInstance.post('/search/location', data)
            .then(res => {
                setQueryRes(res.data)
            })
            .catch(error => {
                if(error.response){
                    addAlert(error.response.data.message,'error')
                    return
                }
                addAlert(error.toString(),'error')
                setQueryRes(null)

            })
    }

    //get current user location from navigator
    const getCurrentLocation = () => {
        let geocode = []
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if(position.coords){
                    geocode.push(position.coords.latitude)
                    geocode.push(position.coords.longitude)
                    getContainmentInfo(geocode)
                }
            },(err)=>addAlert(err.message,'error'))
        } else {
            addAlert("Cannot get your current location! Please try searching your area manually","error");
        }

    }

    //gets geocode for selected address returned from search and call getContainmentInfo()
    const onAddressSelectedListener = (geocode,address) => {
        if(geocode.lat !== 404){
            getContainmentInfo([geocode.lat,geocode.lng])
            setQueryRes(null)
            setQuery(address)
        }

    }

    //gets containment zone info from backend
    const getContainmentInfo = (geoCode) => {
        setLoading(true)
        const data = {location : geoCode}
        AxiosInstance.post('/check/containment/',data)
            .then(res => {
                //storing data to local storage
                localStorage.setItem("containmentData",JSON.stringify(res.data))
                setContainmentRes(res.data)
            })
            .catch(error => {
                if(error.response){
                    addAlert(error.response.data.message,'error')
                    return
                }
                addAlert(error.toString(),'error')

            })
            .finally(()=>setLoading(false))
    }

    //clears the containment data stored in local storage and re render component
    const onClearButtonClickHandler = () =>{
        localStorage.removeItem("containmentData")
        setContainmentRes(null)
    }

    return(
        <div className={Style.Containment}>
            <Typography variant={"h5"}>Check your zone</Typography>
            <Paper className={classes.root} component="form" onSubmit={event => {event.preventDefault(); getQueryRes()}}>
                <InputBase
                    value={query}
                    fullWidth
                    type={"search"}
                    onChange={(event => onTextChanged(event))}
                    className={classes.input}
                    placeholder="Search Area, Street, Pin code"
                    inputProps={{ 'aria-label': 'Search Area, Street, Pin code' }}
                    inputProps={{ 'aria-label': 'Search Area, Street, Pin code' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider}  orientation="vertical" />
                <IconButton onClick={()=>getCurrentLocation()} color="secondary" className={classes.iconButton} aria-label="directions">
                    <LoacationIcon />
                </IconButton>
            </Paper>
            {queryRes &&
                <SearchResCard onClose={()=> setQueryRes(null)}>
                    {queryRes.map(item => {
                        return <h5 key={item.geo.lat} onClick={()=>onAddressSelectedListener(item.geo,item.address)} >{item.address}</h5>
                    })}
                </SearchResCard>
            }

            {loading && <LinearProgress  color={"secondary"}/>}
            {!loading && containmentRes && <ContainmnetList data={containmentRes} onClearButtonClickHandler={onClearButtonClickHandler}/>}

        </div>
    )
}

export default React.memo(Containment)
