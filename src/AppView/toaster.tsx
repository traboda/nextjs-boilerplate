import React from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

const ToasterContainer = () => {

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
            }}
        >
            {(t) => (
                <button className="text-left" onClick={() => toast.remove(t.id)}>
                    <ToastBar toast={t} />
                </button>
            )}
        </Toaster>
    );
};

export default ToasterContainer;