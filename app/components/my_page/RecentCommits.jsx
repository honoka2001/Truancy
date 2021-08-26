import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import styles from "../../styles/my_page/RecentCommits.module.css";
function RecentCommits(props) {
    const [recentCommits, setRecentCommits] = useState();
    function testgrass() {
        let items = [];
        if (recentCommits) {
            recentCommits.map((data) => {
                items.push(
                    <>
                        <ListItem button>
                            <div className={styles.column_date}>
                                {data.date.slice(5).replace("-", "/")}
                            </div>

                            <div className={styles.column_count}>
                                <div className={styles.column_count_value}>
                                    {data.count}
                                </div>
                                <div className={styles.column_count_commits}>
                                    commits
                                </div>
                            </div>
                            <div
                                className={styles.column_color}
                                style={{ backgroundColor: data.code }}
                            ></div>
                            <div className={styles.column_name}>
                                {data.name}
                            </div>

                            <div className={styles.column_message}>
                                {data.message}
                            </div>
                        </ListItem>
                        <Divider />
                    </>
                );
            });
            return <List>{items}</List>;
        }
    }
    useEffect(() => {
        setRecentCommits(props.recent_commits);
    }, [props.recent_commits]);

    return <div>{testgrass()}</div>;
}
export default RecentCommits;
