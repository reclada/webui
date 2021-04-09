import React, { FC, useEffect } from 'react';

import { userService } from '../../services/userService';
import { SearchPage } from '../SearchPage/SearchPage';

type MainPageProps = {
  query: string;
};

export const MainPage: FC<MainPageProps> = function MainPage({ query }) {
  useEffect(() => {
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const sessionState = params.get('session_state');

    if (code && sessionState) {
      userService.fetchToken(code);
    }
  }, [query]);

  return <SearchPage />;
};
