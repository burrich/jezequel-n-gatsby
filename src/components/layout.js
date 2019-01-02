import React from 'react';

import './layout.css';
import styles from './layout.module.css';
import Header from '../components/header';
import Footer from '../components/footer';

// TODO: component container/wrapper (composition) for padding & other props
// TOOD: gatsby example

export default ({ children }) => (
  <div className={styles.layout}>
    <Header />

    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  </div>
);