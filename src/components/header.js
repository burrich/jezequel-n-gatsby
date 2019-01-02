import React from 'react';

import styles from './header.module.css';

export default () => (
  <div className={styles.wrapper}> {/* flex elt */}
    <header className={styles.header}> {/* fixed */}
      <div className={styles.container}> {/* flex container */}
      
        <div className={styles.placeholderAvatar}></div>

        <h1 className={styles.fullname}><a href="">J. Doe</a></h1>

        <p className={styles.job}>Développeur web</p>

      </div>
    </header>
  </div>
);