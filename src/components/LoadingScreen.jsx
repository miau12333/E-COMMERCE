import React from 'react';
import "../styles/loading-screen.css";
const LoadingScreen = () => {
    return (
        <div>
            <div className="overlay"></div>
            <div class="lds-hourglass"></div>
        </div>
    );
};

export default LoadingScreen;