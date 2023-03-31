import React from 'react';
import { Button } from 'chaya-ui';

type NotFoundView = {
    title?: string,
    text?: string
    buttonLink?: string,
    buttonText?: string,
    iconClassName?: string,
    minHeight?: string,
    buttonOnClick?: () => void,
    hideButton?: boolean
};

const NotFoundView = ({
    title = 'Not Found',
    text = 'This page could not be found. Please check the link or try again later',
    buttonText = 'Back to Dashboard',
    iconClassName = 'far fa-transporter-empty',
    minHeight = '85vh',
    buttonLink,
    buttonOnClick,
    hideButton = false,
}: NotFoundView) => (
    <div className="flex items-center text-center justify-center" style={{ minHeight }}>
        <div style={{ width: '600px', maxWidth: '100%' }}>
            <i className={`${iconClassName} opacity-80`} style={{ fontSize: '100px' }} />
            <h1 className="text-4xl font-semibold my-4">{title}</h1>
            <p className="opacity-80 text-lg mb-5">{text}</p>
            {!hideButton && (
                <Button
                    link={typeof buttonOnClick === 'function' ? undefined : buttonLink}
                    onClick={buttonOnClick}
                    variant="solid"
                    color="primary"
                    size="lg"
                    type="button"
                >
                    {buttonText}
                </Button>
            )}
        </div>
    </div>
);

export default NotFoundView;
