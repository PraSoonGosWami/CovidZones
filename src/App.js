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


const App = () => {

    //google analytics
    function initializeReactGA() {
        ReactGA.initialize('UA-168580398-1');
        ReactGA.pageview('/');
        ReactGA.pageview('/about');
    }

    useEffect(()=>{
        initializeReactGA()
    },[])

    const [darkMode, setDarkMode] = useState(true)
    const [dropDownValue, setDropDownValue] = useState("TT")
    const darkTheme = createMuiTheme(DarkTheme)
    const lightTheme = createMuiTheme(LightTheme)


    useEffect(()=>{
        const dark = localStorage.getItem("dark")
        const stateCode = localStorage.getItem("stateCode")
        dark === "Y" ? setDarkMode(true) : setDarkMode(false)
        setDropDownValue(stateCode?stateCode:"TT")
    },[])

    const handleDarkMode = () =>{
        setDarkMode(prevState => !prevState)
        localStorage.setItem("dark",darkMode?"N":"Y")
    }

    const onDropDownChangeHandler = (event) => {
        setDropDownValue(event.target.value)
        localStorage.setItem("stateCode",event.target.value)
    }
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <SnackBarProvider>
                <Paper style={{minHeight:"100vh"}}>
                    <Appbar
                        checked={darkMode}
                        handleChange={()=> handleDarkMode()}
                        dropDownValue={dropDownValue}
                        onDropDownChangeHandler={onDropDownChangeHandler}/>
                    <MainComponent stateCode={dropDownValue}/>
                </Paper>
            </SnackBarProvider>
        </ThemeProvider>

    );
}

export default App;
