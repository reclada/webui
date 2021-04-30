import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthGuard } from 'src/pages/AuthGuard';
import { routes } from 'src/pages/routes';
import { SearchPage } from 'src/pages/SearchPage/SearchPage';

import { FilesPage } from './pages/FilesPage/FilesPage';
import { SearchResultPage } from './pages/SearchResultPage/SearchResultPage';
import { TemporaryPdfView } from './pages/TemporaryPdfView/TemporaryPdfView';
import { authService } from './services/authService';

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    authService.init().then(() => setLoading(false));
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/viewer" render={routeProps => <TemporaryPdfView />} />
        <Route
          path={routes.search}
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
        <Route path={routes.files}>
          <AuthGuard>
            <FilesPage />
          </AuthGuard>
        </Route>
        <Route path={routes.root} render={routeProps => <SearchPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
