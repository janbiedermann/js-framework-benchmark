// entry file for the browser environment

// import npm modules that are valid to use only in the browser
import * as Redux from 'redux';
global.Redux = Redux;
import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import * as Mui from '@material-ui/core';
import * as MuiStyles from '@material-ui/styles';
global.Mui = Mui;
global.MuiStyles = MuiStyles;

import init_app from 'benchmark_loader.rb';
init_app();
Opal.load('benchmark_loader');


