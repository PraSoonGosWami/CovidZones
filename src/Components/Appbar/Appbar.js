import React, {useEffect, useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppLogo from '../../Assets/logo.png'
import Style from './Appbar.module.css'
import ToLightModeIcon from '@material-ui/icons/WbSunny';
import ToDarkModeIcon from '@material-ui/icons/Brightness3';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import {useHistory} from "react-router";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import StateCodesJSON from '../../Utils/StateCodes.json'
import Tooltip from "@material-ui/core/Tooltip";

const Appbar = (props) => {
    const history = useHistory()

    const [stateCodes, setStateCodes] = useState(StateCodesJSON)

    const infoHandler = () => {
        history.push('/about')
    }


    return (
        <AppBar position={"sticky"}>
            <Toolbar className={Style.Appbar}>
                <header>
                    <img src={AppLogo} alt={"App logo"}/>
                    <Typography variant="h6">CovidZones</Typography>
                </header>

                <header>
                    <TextField

                        value={props.dropDownValue}
                        onChange={(event => props.onDropDownChangeHandler(event))}
                        select
                        variant={"outlined"}
                        size={"small"} color={"secondary"}>
                        {Object.keys(stateCodes).map(code => {
                            return <MenuItem key={code} value={code}>{stateCodes[code]}</MenuItem>
                        })}
                    </TextField>

                    <Tooltip title={"Info"}>
                        <IconButton color="secondary" onClick={() => infoHandler()}>
                            <InfoIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={"Theme mode"}>
                    <IconButton color="secondary" onClick={props.handleChange}>
                        {props.checked ? <ToLightModeIcon/> : <ToDarkModeIcon/>}
                    </IconButton>
                    </Tooltip>
                </header>
            </Toolbar>
        </AppBar>

    )
}

export default Appbar
