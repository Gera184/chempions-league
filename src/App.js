import React from "react";
import { AuthProvider } from "./components/contexts/AuthContext";
import { Teams } from "./components/teams/Teams.js";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Leagues } from "./components/leagues/Leagues";
import Players from "./components/players/Players";
import Stadium from "./components/stadiums/Stadium";
import Referees from "./components/referees/Referees";

export default () => {
  return (
    <div
      style={{
        paddingTop: "95px",
        fontFamily: "Sofia sans-serif",
        background: "whitesmoke",
        overflowX: "hidden",
      }}
    >
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/leagues" component={Leagues} />
            <Route exact path="/" component={Leagues} />
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/players" component={Players} />
            <Route exact path="/stadiums" component={Stadium} />
            <Route exact path="/referees" component={Referees} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};
