// entry file for the browser environment

// import npm modules that are valid to use only in the browser
import * as Redux from 'redux';
global.Redux = Redux;
import React from 'react';
global.React = React;
import * as ReactRouter from 'react-router';
import * as ReactRouterDOM from 'react-router-dom';
global.ReactRouter = ReactRouter;
global.ReactRouterDOM = ReactRouterDOM;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
// global.History = History;
global.Router = BrowserRouter;
global.Link = Link;
global.NavLink = NavLink;
global.Route = Route;
global.Switch = Switch;
import * as ReactJSS from 'react-jss';
global.ReactJSS = ReactJSS;

import init_app from 'benchmark_loader.rb';
init_app();
Opal.load('benchmark_loader');


