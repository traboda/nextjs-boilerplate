import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

type Icon = {
  icon: string,
  size?: number | string,
  alt?: string,
  title?: string,
  ariaHidden?: boolean,
  className?: string,
};

const Icon = ({ icon, size = 30, alt = '', title = null, className = '', ariaHidden = null }: Icon) => {
  const DynamicIcon = useMemo(() => {
    return require.resolve(`../../public/assets/icons/${icon}.svg`) ?
      dynamic(() => import(`../../public/assets/icons/${icon}.svg`), {}) as React.FC<React.SVGProps<SVGSVGElement>> :
      null;
  }, [icon]);

  return (
      <div title={title || alt} className={`flex items-center justify-center ${className}`}>
          {DynamicIcon ? (
              <DynamicIcon
                  aria-hidden={ariaHidden}
                  fill="currentColor"
                  className="menu-icon"
                  height={size}
                  width={size}
              />
          ) : (
              <span>{alt}</span>
          )}
      </div>
  );
};

export default Icon;