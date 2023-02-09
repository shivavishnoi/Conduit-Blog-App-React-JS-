import { BrowserRouter, Route } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails';
import { Header } from './components/Header';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" exact>
          <Hero />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/articles/:slug">
          <ArticleDetails />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
