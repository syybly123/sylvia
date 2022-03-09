import React from 'react';
import { Layout, Typography } from "antd";
import { useTranslation, withTranslation} from 'react-i18next';
import styles from './Footer.module.css';
export const Footer: React.FC = () => {
    const {t} = useTranslation();
    return (
        <Layout.Footer className={styles["footer"]}>
       
        <Typography.Text className={styles["footer-text"]}>
           Visit a single location or make it a multi-destination trip.
        </Typography.Text>
        <Typography.Title level={4} style={{textAlign:"center"}}>
          {t("footer.detail")}
        </Typography.Title>
      </Layout.Footer>
    )
}