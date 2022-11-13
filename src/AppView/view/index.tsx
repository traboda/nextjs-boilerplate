import React from "react";
import {ToastContainer} from "react-toastify";

const AppView = ({ children, minimal = false }) => {

    return (
        <React.Fragment>
                {/*<Header />*/}
                <div className="flex justify-center">
                    <div style={{width: '1100px', maxWidth: '100%'}}>
                        <main className="p-2">
                            {children}
                        </main>
                        {/*<Footer/>*/}
                        <ToastContainer />
                    </div>
                </div>
        </React.Fragment>
    );

};

export default AppView;