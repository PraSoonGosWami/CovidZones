import React, {createContext, useCallback, useState} from 'react'
import AlertNotification from "../UI/Alert/AlertNotification";
import shortId from 'shortid'
export const SnackBarContext = createContext([])


export function SnackBarProvider({ children }) {
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState([])

    const addAlert = useCallback((message,type) => {
        setShowAlert(true)
        setAlert([{message,type}])
    },[])

    const value = {addAlert}

    return (
        <SnackBarContext.Provider value={value}>
            {children}
            {alert.map(el =>
                <AlertNotification
                    key={shortId.generate()}
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    type={el.type}>{el.message}
                </AlertNotification>
            )}
        </SnackBarContext.Provider>
    )
}