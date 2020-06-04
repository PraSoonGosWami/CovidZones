import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";


const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if(!supportsPWA){
        return null
    }

    return (
        <React.Fragment>
            <h3 style={{marginBottom:"10px"}}>Install our app for fast access</h3>
            <Button
                variant={"contained"}
                color={"secondary"}
                aria-label="Install app"
                onClick={onClick}
            >
                Install
            </Button>
        </React.Fragment>

    );
};

export default InstallPWA;