import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Style from './Containment.module.css'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import LoacationIcon from '@material-ui/icons/MyLocation';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from '@material-ui/core/styles';
import AxiosInstance from '../../../Services/AxiosInstance'
import SearchResCard from "../../../UI/SearchResCard/SearchResCard";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContainmnetList from "./ContainmentList/ContainmnetList";
import useAlert from "../../../Hooks/useAlert";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';


const Containment = () => {
    const [darkMode, setDarkMode] = useState(false)
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            marginTop: "32px",
            backgroundColor: darkMode ? "rgba(33, 33, 33, 1)" : "rgba(242, 242, 242, 1)",
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
    const [containmentRes, setContainmentRes] = useState(null)
    const [loading, setLoading] = useState(false)
    const dark = localStorage.getItem("dark")
    const {addAlert} = useAlert()

    useEffect(() => {
        dark === "Y" ? setDarkMode(true) : setDarkMode(false)
    }, [dark])

    //loads last detected containment zone data
    useEffect(() => {
        const containmentData = localStorage.getItem("containmentData")
        if (containmentData) {
            setContainmentRes(JSON.parse(containmentData))
            window.scrollTo(0, 0)
        }
    }, [])

    //get current user location from navigator
    const getCurrentLocation = () => {
        let geocode = []
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (position.coords) {
                    geocode.push(position.coords.latitude)
                    geocode.push(position.coords.longitude)
                    getContainmentInfo(geocode)
                }
            }, (err) => addAlert(err.message, 'error'))
        } else {
            addAlert("Cannot get your current location! Please try searching your area manually", "error");
        }

    }

    //gets geocode for selected address returned from search and call getContainmentInfo()
    const onAddressSelectedListener = async (value) => {
        if (value) {
            const res = await geocodeByAddress(value)
            const geocode = await getLatLng(res[0])
            getContainmentInfo([geocode.lat, geocode.lng],value)
        }

    }

    //gets containment zone info from backend
    const getContainmentInfo = (geoCode,address) => {
        setLoading(true)
        const data = {location: geoCode}
        if(!address || address === undefined)
            data.needAddress = true
        AxiosInstance.post('/check/containment/', data)
            .then(res => {
                if(address && address.length>0)
                    res.data.address= address
                res.data.geoCode = geoCode
                //storing data to local storage

                localStorage.setItem("containmentData", JSON.stringify(res.data))
                setContainmentRes(res.data)
            })
            .catch(error => {
                if (error.response) {
                    addAlert(error.response.data.message, 'error')
                    return
                }
                addAlert(error.toString(), 'error')

            })
            .finally(() => setLoading(false))
    }

    //clears the containment data stored in local storage and re render component
    const onClearButtonClickHandler = () => {
        localStorage.removeItem("containmentData")
        setContainmentRes(null)
    }

    return (
        <div className={Style.Containment}>
            <Typography variant={"h5"}>Check your zone</Typography>
            <PlacesAutocomplete value={query} onChange={(address) => setQuery(address)} onSelect={onAddressSelectedListener}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <Paper className={classes.root}>
                            <InputBase
                                fullWidth
                                type={"search"}
                                {...getInputProps({
                                    placeholder: "Search Area, Street, Pin code",
                                    className: classes.input,
                                })}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical"/>
                            <IconButton onClick={() => getCurrentLocation()} color="secondary"
                                        className={classes.iconButton}
                                        aria-label="directions">
                                <LoacationIcon/>
                            </IconButton>
                        </Paper>
                        {loading && <LinearProgress color={"secondary"}/>}
                        {suggestions.length > 0 && <SearchResCard>
                            {suggestions.map(item => {
                                return <h5
                                    {... getSuggestionItemProps(item)}
                                    key={item.placeId}
                                >
                                    {item.description}
                                </h5>
                            })}
                        </SearchResCard>}
                    </div>
                )}
            </PlacesAutocomplete>
            {loading && <LinearProgress color={"secondary"}/>}
            {!loading && containmentRes &&
            <ContainmnetList data={containmentRes} onClearButtonClickHandler={onClearButtonClickHandler}/>}
        </div>
    )
}

export default React.memo(Containment)
