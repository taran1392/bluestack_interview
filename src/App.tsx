import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Dashboard from './components/Dashboard';
import { DashBoardStore } from './stores/dashboardStore';
import { useTranslation } from 'react-i18next';

function App() {
  const {t, i18n} = useTranslation();


  return (
      <React.Fragment>
     
        <nav className="navbar navbar-light bg-dark">
        <a className="navbar-brand" href="#">
          <img src="/app-icon.jpg" width="130" height="50" className="d-inline-block align-top" alt=""/>
           
        </a>
        <select value={i18n.language} onChange={event => i18n.changeLanguage(event.target.value)}>
          <option value="en">English</option>
          <option value={"ge"}>Germany</option>
        </select>
      </nav>
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 col-md-8 offset-md-2">
              <h1>Manage Campaigns</h1>
              <Dashboard/>
              </div>
          </div>
      </div>
      
      </React.Fragment>
  );
}

export default App;
