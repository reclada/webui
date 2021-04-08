import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { SearchPage } from './pages/SearchPage/SearchPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SearchResultPage } from './pages/SearchResultPage/SearchResultPage';
import { TemporaryPdfView } from './pages/TemporaryPdfView/TemporaryPdfView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/viewer" render={routeProps => <TemporaryPdfView />} />
        <Route
          path="/search"
          render={routeProps => <SearchResultPage query={routeProps.location.search} />}
        />
        <Route
          path="/"
          render={routeProps => <MainPage query={routeProps.location.search} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
