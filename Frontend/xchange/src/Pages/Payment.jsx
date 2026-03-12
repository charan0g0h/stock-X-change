import { useLocation } from "react-router-dom"

function Payment(){

    const state = useLocation()

    return(
        <>
        <h1>this is payment</h1>
        </>
    )
}

export default Payment