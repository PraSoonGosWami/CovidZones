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

const Containment = (props) => {
    const [darkMode, setDarkMode] = useState(false)
    useEffect(()=>{
        const dark = localStorage.getItem("dark")
        dark === "Y" ? setDarkMode(true) : setDarkMode(false)
    },[])
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

    const onTextChanged = (event) => {
        setQuery(event.target.value)
        if(query.length===0){
            setQueryRes(null)
        }
       // getQueryRes()
    }

    const getQueryRes =() =>{
        const data = {query}
        setQueryRes([{address:"Searching...",geo:{lat:201}}])
        AxiosInstance.post('/search/location', data)
            .then(res => {
                setQueryRes(res.data)
            })
            .catch(error => {
                console.log(error.response)
                if(error.response.data){
                    setQueryRes([{address:error.response.data.message,geo:{lat:404}}])
                }
            })
    }

    const onAddressSelectedListener = (geocode,address) => {
        getContainmentInfo(geocode)
        setQueryRes(null)
        setQuery(address)

    }

    const getContainmentInfo = (geoCode) => {

        const data = {location : [geoCode.lat,geoCode.lng]}
        AxiosInstance.post('/check/containment/',data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div className={Style.Containment}>
            <Typography variant={"h5"}>Check your zone</Typography>
            <Paper className={classes.root} component="form" onSubmit={event => {event.preventDefault(); getQueryRes()}}>
                <InputBase
                    value={query}
                    fullWidth
                    type={"text"}
                    onChange={(event => onTextChanged(event))}
                    className={classes.input}
                    placeholder="Search Area, Locality, Cites, States..."
                    inputProps={{ 'aria-label': 'Search Area, Locality, Cites, States...' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider}  orientation="vertical" />
                <IconButton color="secondary" className={classes.iconButton} aria-label="directions">
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
        </div>
    )
}

export default Containment
