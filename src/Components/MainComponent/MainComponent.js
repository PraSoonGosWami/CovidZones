import React, {Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './MainComponent.module.css'
import HomePage from "../../Pages/HomePage/HomePage";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
const AboutPage = React.lazy(()=>import('../../Pages/AboutPage/AboutPage'))
const MainComponent = (props) => {
    return(
        <div className={Style.MainComponent}>
            <Suspense fallback={<ProgressBar/>}>
                <Switch>
                    <Route path={'/'} exact component={()=> <HomePage stateCode={props.stateCode}/>} />
                    <Route path={'/about'} exact component={AboutPage}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default React.memo(MainComponent)
