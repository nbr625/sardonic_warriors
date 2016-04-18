import React from 'react';
import { Router, Route, IndexRoute, Handler } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import Game from './components/game.jsx';
import StartScreen from './components/start_screen.jsx';
import battleWrapper from './components/game.jsx';
import selectionScreenWrapper from './components/game.jsx';
import Intro from './components/intro/intro.jsx';
import IPanel1 from './components/intro/panels/intro-panel-1.jsx';
import IPanel2 from './components/intro/panels/intro-panel-2.jsx';
import IPanel3 from './components/intro/panels/intro-panel-3.jsx';

const historyOptions = {
  queryKey : false
};


const routes = (
  <Router history={createHistory(historyOptions)}>

    <Route path='/' component={ Game }>
      <IndexRoute component={StartScreen}></IndexRoute>
      <Route path='intro' component={Intro}>
        <IndexRoute component={IPanel1} ></IndexRoute>
        <Route path='intro-panel-2' component={IPanel2}></Route>
        <Route path='intro-panel-3' component={IPanel3}></Route>
      </Route>
      <Route path='selection-screen' component={ Game.selectionScreenWrapper }></Route>
      <Route path='battle' component={Game.BattleWrapper}></Route>

    </Route>
  </Router>
);

export default routes;