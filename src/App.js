import React, {useEffect, useState} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import DarkTheme from './UI/MaterialTheme/dark.json'
import LightTheme from './UI/MaterialTheme/light.json'
import Appbar from "./Components/Appbar/Appbar";
import Paper from "@material-ui/core/Paper";
import MainComponent from "./Components/MainComponent/MainComponent";
import ReactGA from 'react-ga';
import {SnackBarProvider} from "./Context/SnackBarContext";
import Axios from "axios";
import {Helmet} from "react-helmet";
import ProgressBar from "./UI/ProgressBar/ProgressBar";


const App = () => {

    //google analytics
    function initializeReactGA() {
        ReactGA.initialize('UA-168580398-1');
        ReactGA.pageview('/');
        ReactGA.pageview('/about');
    }

    useEffect(() => {
        initializeReactGA()
    }, [])

    const [darkMode, setDarkMode] = useState(true)
    const [dropDownValue, setDropDownValue] = useState("TT")
    const darkTheme = createMuiTheme(DarkTheme)
    const lightTheme = createMuiTheme(LightTheme)

    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        Axios.get("https://covid-zones.firebaseio.com/token.json")
            .then(res => {
                setToken(res.data)
            })
            .catch(err => {
                setToken(null)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        const dark = localStorage.getItem("dark")
        const stateCode = localStorage.getItem("stateCode")
        dark === "Y" ? setDarkMode(true) : setDarkMode(false)
        setDropDownValue(stateCode ? stateCode : "TT")
    }, [])

    const handleDarkMode = () => {
        setDarkMode(prevState => !prevState)
        localStorage.setItem("dark", darkMode ? "N" : "Y")
    }

    const onDropDownChangeHandler = (event) => {
        setDropDownValue(event.target.value)
        localStorage.setItem("stateCode", event.target.value)
    }
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <SnackBarProvider>
                <Paper style={{minHeight: "100vh"}}>
                    <Appbar
                        checked={darkMode}
                        handleChange={() => handleDarkMode()}
                        dropDownValue={dropDownValue}
                        onDropDownChangeHandler={onDropDownChangeHandler}/>
                    {!loading && <MainComponent stateCode={dropDownValue}/>}
                    {loading && <ProgressBar/>}
                </Paper>
            </SnackBarProvider>
            {token && <Helmet>
                <script
                    src={"https://apis.mapmyindia.com/advancedmaps/v1/" + token + "/map_load?v=1.5&plugins=coronaLayers&callback=initializeMap"}></script>
            </Helmet>}
        </ThemeProvider>

    );
}

export default App;
