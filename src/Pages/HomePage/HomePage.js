import React, {useEffect, useState} from 'react'
import Style from './HomePage.module.css'
import StateSection from "./StateSection/StateSection";
import Containment from "./ContainmentSection/Containment";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
import NotificationDialog from "../../UI/NotificationDialog/NotificationDialog";
import Axios from "axios";
const HomePage = (props) => {
    const [loading , setLoading] = useState(true)
    const [notifications, setNotification] = useState(null)
    const [openAlert, setOpenAlert] = React.useState(false);
    const handleClose = () => {
        setOpenAlert(false);
    };
    useEffect(() => {
        Axios.get("https://covid-zones.firebaseio.com/patch.json")
            .then(res => {
                const patchId = res.data
                const prevPatchId = localStorage.getItem("patchId")
                if(!prevPatchId){
                    getNotification(patchId)
                }else{
                    if(prevPatchId !== patchId){
                        getNotification(patchId)
                    }else{
                        setOpenAlert(false)
                        setNotification(null)
                    }
                }
            })

    },[])

    const  getNotification = (patchId) =>{
        Axios.get("https://covid-zones.firebaseio.com/notifications.json")
            .then(res=>{
                setNotification(res.data)
                setOpenAlert(true)
                localStorage.setItem("patchId",patchId)
            })
            .catch(err => {
                setNotification(null)
                setOpenAlert(false)
            })
    }

    return(
        <div className={Style.HomePage}>
            {notifications && notifications.length > 0 && <NotificationDialog
                notifications={notifications}
                open={openAlert} handleClose={handleClose}/>
            }
            {loading && <ProgressBar/>}
            <StateSection setLoading={setLoading} stateCode={props.stateCode}/>
            {!loading && <Containment/>}
        </div>
    )
}

export default React.memo(HomePage)
