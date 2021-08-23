import React, { useState, useEffect } from "react";
import styles from "../../styles/my_page/GrassAtom.module.css";

function GrassAtom(props) {
    function kusaType(commits, motivation) {
        // 変数名=>コミット数の多さ_モチベーションの高さ
        let many_high = motivation >= 50 && commits >= 10;
        let many_low = motivation < 50 && commits >= 10;
        let few_high = motivation >= 50 && commits < 10;
        let few_low = motivation < 50 && commits < 10;
        let empty = commits == 0;

        if (empty) return <div className={style.empty_commit}></div>;
        else if (many_high)
            return <div className={`${styles.many_commits} ${styles.high_motivation}`}></div>;
        else if (many_low)
            return <div className={`${styles.many_commits} ${styles.low_motivation}`}></div>;
        else if (few_high)
            return <div className={`${styles.few_commits} ${styles.high_motivation}`}></div>;
        else if (few_low)
            return <div className={`${styles.few_commits} ${styles.low_motivation}`}></div>;
    }

   
    return <div className={styles.maru_area}>{kusaType(props.commits, props.motivation)}</div>;

}
export default GrassAtom;
