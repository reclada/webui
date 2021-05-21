import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import { SearchPage } from './pages/SearchPage/SearchPage';
import { SearchResultPage } from './pages/SearchResultPage/SearchResultPage';
import { TemporaryPdfView } from './pages/TemporaryPdfView/TemporaryPdfView';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/viewer" render={routeProps => <TemporaryPdfView />} />
        <Route
          path="/search"
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
        <Route path="/">
          {/*<SearchPage />*/}
          <SearchResultPage query="" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
