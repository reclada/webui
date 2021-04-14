import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { FilesPage } from './pages/FilesPage/FilesPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SearchResultPage } from './pages/SearchResultPage/SearchResultPage';
import { TemporaryPdfView } from './pages/TemporaryPdfView/TemporaryPdfView';
import { userService } from './services/userService';

function App() {
  useEffect(() => {
    userService.restoreSession();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/viewer" render={routeProps => <TemporaryPdfView />} />
        <Route
          path="/search"
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
        <Route path="/files">
          <FilesPage />
        </Route>
        <Route
          path="/"
          render={routeProps => <MainPage query={routeProps.location.search} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
