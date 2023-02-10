import { Route, Switch } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails';
import { Header } from './components/Header';
import Hero from './components/Hero';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Hero />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/articles/:slug" component={ArticleDetails} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
