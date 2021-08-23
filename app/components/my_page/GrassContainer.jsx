import React, { useState, useEffect } from "react";
import styles from "../../styles/my_page/GrassContainer.module.css";
import GrassAtom from "./GrassAtom";

function GrassContainer(props) {
    const [yearMotivations, setYearMotivations] = useState([]);
    function testgrass() {
        // const items = [];
        // for (let i = 1; i <= 50; i++) {
        //     // return <GrassAtom />;
        //     // return <p>a</p>;

        //     const tate = [];
        //     for (let j = 1; j <= 7; j++) {
        //         tate.push(<GrassAtom />);
        //     }
        //     items.push(<div className={styles.tate}>{tate}</div>);
        // }
        if (yearMotivations) {
            let cnt = 1;
            let tate = [];
            let items = [];
            yearMotivations.map((data) => {
                if (cnt % 7 != 0) {
                    tate.push(
                        <GrassAtom
                            commits={data.daily_total_commits}
                            motivation={data.motivation}
                            motivation_id={data.id}
                        />
                    );
                    console.log(tate);
                } else {
                    tate.push(
                        <GrassAtom
                            commits={data.daily_total_commits}
                            motivation={data.motivation}
                            motivation_id={data.id}
                        />
                    );
                    tate = [];
                    items.push(<div className={styles.tate}>{tate}</div>);
                    console.log(tate);
                }
                cnt++;
            });
            return items;
        }
    }

    useEffect(() => {
        setYearMotivations(props.year_motivations);
        console.log(props.year_motivations);
    }, [props.year_motivations]);

    return (
        <div className={styles.container}>
            {/* <p>{props.year_motivations[0].motivation}</p> */}
            {testgrass()}
        </div>
    );
}
export default GrassContainer;
