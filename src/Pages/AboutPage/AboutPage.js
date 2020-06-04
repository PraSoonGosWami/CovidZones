import React from 'react'
import Style from './AboutPage.module.css'
import AppFooter from "./AppFooter/AppFooter";
import TermsCondition from "./TermsCondition";
import InstallPWA from "../../Utils/InstallPWA";

const AboutPage = (props) => {
    return (
        <div className={Style.AboutPage}>
            <header>
                <h2>Data Source</h2>
                <h3>State and district stats</h3>
                <p><a href={"https://github.com/covid19india/api"} rel="noopener noreferrer" target={"_blank"}>https://github.com/covid19india/api</a></p>
                <h3>Containment zone data</h3>
                <p><a href={"https://geoiq.io/covid19.html"} rel="noopener noreferrer" target={"_blank"}>https://geoiq.io/covid19.html</a></p>
                <h3>Github repository</h3>
                <p><a href={"https://github.com/PraSoonGosWami/CovidZones"} rel="noopener noreferrer" target={"_blank"}>https://github.com/PraSoonGosWami/CovidZones</a></p>
                <h3>Visit for more information</h3>
                <p><a href={"https://www.covid19india.org/"} rel="noopener noreferrer" target={"_blank"}>https://www.covid19india.org/</a></p>
                <p><a href={"https://www.mohfw.gov.in/"} rel="noopener noreferrer" target={"_blank"}>https://www.mohfw.gov.in/</a></p>

                <InstallPWA/>
            </header>
            <TermsCondition/>
            <AppFooter/>
        </div>

    )
}

export default AboutPage
