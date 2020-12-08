import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import NavBar from './components/views/NavBar/NavBar.js';
import Footer from './components/views/Footer/Footer.js';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage.js';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage.js';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/video/upload"
              component={Auth(VideoUploadPage, true)}
            />
            <Route
              exact
              path="/video/:videoId" // video id로 독립적인 페이지로.
              component={Auth(VideoDetailPage, null)}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
