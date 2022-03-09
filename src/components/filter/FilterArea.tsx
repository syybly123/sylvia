import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="Route Review" tags={["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Departure City" tags={["Melbourne", "Sydney", "Brisbane", "Gold Coast"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Tour Days" tags={["2 days", "3 days", "4 days", "5 days", "6 days"]} />
      <Divider dashed />
      <Filter
        title="Toute Types"
        tags={["Tour Group", "Independent Tour", "Self-driving", "Customized Tour"]}
      />
      <Divider dashed />
      <Filter title="Departure Time" tags={["Christmas Day", "Easter", "Thanks-giving Day"]} />
    </>
  );
};