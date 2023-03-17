import React, { useContext } from 'react';

import { PrefetchContext } from '../utils';

const LandingPage = () => {

  const { profile } = useContext(PrefetchContext);

  return (
      <div>
          <h1>
              Hello
              {profile?.id ? profile?.username : 'World'}
              !
          </h1>
      </div>
  );

};

export default LandingPage;