import React from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useTheme } from '@emotion/react';
import Color from 'color';

const ToasterContainer = () => {

  const theme = useTheme();

  return (
      <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme?.background,
              border: `1px solid ${Color(theme?.color).fade(0.6).string()}`,
              boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.25)',
              color: theme?.color,
            },
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