import React from 'react';
import styles from './mainLayout.module.css';
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    
  } from "../../components";

export const MainLayout: React.FC =({children})=> {

    return (
        <div>
            <Header />
            <div className={styles["page-content"]}>
                {children}
                </div>
            <Footer />
        </div>
    );
};