import {useContext} from 'react'
import {SnackBarContext} from "../Context/SnackBarContext";

const useAlert = () => useContext(SnackBarContext)

export default useAlert