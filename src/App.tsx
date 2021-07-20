import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { AuthGuard } from 'src/pages/AuthGuard';
import { routes } from 'src/pages/routes';

import { FilePageType, FilesPage } from './pages/FilesPage/FilesPage';
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
    <HashRouter>
      <Switch>
        <Route path="/viewer" render={routeProps => <TemporaryPdfView />} />
        <Route
          path={routes.search}
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
        <Route path={routes.datasets}>
          <FilesPage pageType={FilePageType.Datasets} />
        </Route>
        <Route path={routes.datasources}>
          <AuthGuard>
            <FilesPage pageType={FilePageType.Datasources} />
          </AuthGuard>
        </Route>
        <Route path={routes.assets}>
          <AuthGuard>
            <FilesPage pageType={FilePageType.Assets} />
          </AuthGuard>
        </Route>
        <Route path={routes.available}>
          <AuthGuard>
            <FilesPage pageType={FilePageType.Available} />
          </AuthGuard>
        </Route>
        <Route
          path={routes.root}
          exact={true}
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
