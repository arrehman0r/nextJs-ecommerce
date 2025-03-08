import React from "react";
import { useSelector } from "react-redux";


const AppLoader = () => {


    const loading = useSelector((state) => state.utils.loading)

    if (!loading) return null

    return (
        <div className="loading-overlay">
            <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
                <div className="bounce4"></div>
            </div>
        </div>
    )
}

export default AppLoader