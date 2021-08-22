import React, { useState, useEffect } from "react";
import styles from "../../styles/my_page/GrassContainer.module.css";
import GrassAtom from "./GrassAtom";

function GrassContainer() {
    function testgrass() {
        const items = [];
        for (let i = 1; i <= 50; i++) {
            // return <GrassAtom />;
            // return <p>a</p>;

            const tate = [];
            for (let j = 1; j <= 7; j++) {
                tate.push(<GrassAtom />);
            }
            items.push(<div className={styles.tate}>{tate}</div>);
        }
        return items;
    }
    return <div className={styles.container}>{testgrass()}</div>;
}
export default GrassContainer;
