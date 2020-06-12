import React, {Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './MainComponent.module.css'
import HomePage from "../../Pages/HomePage/HomePage";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
import Fab from "@material-ui/core/Fab";
import MapIcon from "@material-ui/icons/Map";
import MapsDialog from "../../UI/MapsDialog/MapsDialog";


const AboutPage = React.lazy(() => import('../../Pages/AboutPage/AboutPage'))


const MainComponent = (props) => {
    //map dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={Style.MainComponent}>
            <Suspense fallback={<ProgressBar/>}>
                <Switch>
                    <Route path={'/'} exact component={() => <HomePage stateCode={props.stateCode}/>}/>
                    <Route path={'/about'} exact component={AboutPage}/>
                </Switch>
            </Suspense>

            <Fab onClick={handleClickOpen} size="large" color="secondary" aria-label="open map" >
                <MapIcon />
            </Fab>
            <MapsDialog open={open} handleClose={handleClose}/>
        </div>
    )
}

export default React.memo(MainComponent)
