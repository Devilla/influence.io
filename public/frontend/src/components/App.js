import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import  '../assets/stylesheets/slick.css'
import  '../assets/stylesheets/slick-theme.css'
import  '../assets/stylesheets/style.css'

import Header from './_common/Header';
import Footer from './_common/Footer';
import { checkTokenExists } from '../ducks/auth';
import { store } from '../index.js';

const App = ({ children, props }) => {
  return (
      <div>
        <Header />
        <div className="content">
          {children}
        </div>
        <Footer />
      </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
