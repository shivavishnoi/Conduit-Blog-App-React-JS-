import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleDetails from './components/ArticleDetails';
import { Header } from './components/Header';
import Hero from './components/Hero';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import { Bars } from 'react-loader-spinner';
import NewPost from './components/NewPost';
import Profile from './components/Profile';
import Settings from './components/Settings';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let storageKey = localStorage['app_user'];
    if (storageKey) {
      fetch('https://api.realworld.io/api/user', {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then((err) => {
            return Promise.reject;
            err;
          });
        })
        .then((user) => {
          updateUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsVerifying(false);
    }
  }, []);

  const updateUser = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    setIsVerifying(false);
    localStorage.setItem('app_user', userInfo.user.token);
  };
  return !isVerifying ? (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} user={user} />
      {isLoggedIn ? (
        <AuthenticatedUser isLoggedIn={isLoggedIn} user={user} />
      ) : (
        <UnAuthenticatedUser updateUser={updateUser} />
      )}
    </div>
  ) : (
    <div className="flex justify-center padding-1">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
  function AuthenticatedUser(props) {
    return (
      <Switch>
        <Route path="/" exact>
          <Hero isLoggedIn={props.isLoggedIn} userData={props.user} />
        </Route>
        <Route path="/new-post">
          <NewPost userData={props.user} />
        </Route>
        <Route path="/profile" exact>
          <Profile userData={props.user} isLoggedIn={props.isLoggedIn} />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/settings">
          <Settings userData={props.user} />
        </Route>
        <Route path="/articles/:slug">
          <ArticleDetails isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    );
  }
  function UnAuthenticatedUser(props) {
    return (
      <Switch>
        <Route path="/" exact>
          <Hero />
        </Route>
        <Route path="/login">
          <Login updateUser={props.updateUser} />
        </Route>
        <Route path="/register">
          <Register updateUser={props.updateUser} />
        </Route>
        <Route path="/articles/:slug" component={ArticleDetails} />
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    );
  }
}

export default App;
