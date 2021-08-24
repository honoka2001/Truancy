import React, { useState, useEffect } from "react";
import firebase from "../components/firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

import dynamic from "next/dynamic";
import styles from "../styles/MyPage.module.css";
import GrassContainer from "../components/my_page/GrassContainer";

import Card from "@material-ui/core/Card";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CallMadeIcon from "@material-ui/icons/CallMade";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const CommitMotivationChart = dynamic(
    () => import("../components/my_page/CommitMotivationChart"),
    {
        ssr: false,
    }
);
const MotivationDetail = dynamic(() => import("../components/my_page/MotivationDetail"), {
    ssr: false,
});
const DefinitionChart = dynamic(() => import("../components/my_page/DefinitionChart"), {
    ssr: false,
});
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "20vw",
        margin: 0,
        backgroundColor: theme.palette.background.paper,
        display: "inline-block",
        position: "fixed",
    },
    chart_card: {
        display: "inline-block",
        width: "73vw",
        height: "30vh",
        marginBottom: "3vh",
    },
    pie_card: {
        display: "inline-block",
        width: "35%",
        height: "40vh",
        paddingTop: "5vh",
    },
    motivation_card: {
        width: "23%",
        height: "14vh",
        display: "inline-block",
    },
    kusa_card: {
        width: "100%",
        height: "30vh",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        marginBottom: "3vh",
    },
    commits_card: {
        width: "65%",
        height: "40vh",
        display: "inline-block",
    },
}));

const userRepository = RepositoryFactory.get("users");
const motivationRepository = RepositoryFactory.get("motivations");

export default function MyPage() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [userData, setUserData] = useState([]);
    const [userName, setUserName] = useState("");
    const [motivations, setMotivation] = useState([]);

    async function userPost(uid) {
        try {
            const res = await userRepository.post({
                user: {
                    uid: uid,
                },
            });
            console.log(res);
            setUserData(res.data);
            getMotivationShow(res.data.id);
            console.log(motivations);
        } catch (error) {
            console.log(error);
        }
    }

    async function getMotivationShow(id) {
        try {
            const res = await motivationRepository.showGet(id);
            console.log(res);
            setMotivation(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            userPost(user.uid);
            setUserName(user.displayName);
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <div className={styles.nav_user_name}>{userName}</div>
                    <Button variant="contained">NewCommits</Button>
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <PersonalVideoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <CallMadeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Commits" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <EditOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Difinition" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItem>

                    <div className={styles.nav_total_commits}>{motivations.total_commits}</div>
                    <Button variant="contained">LogOut</Button>
                </List>
            </div>

            <div className={styles.bar}>{`${year}/${month}/${day}`}</div>
            <div className={styles.main_container}>
                <div className={styles.four_card_container}>
                    <Card className={classes.motivation_card}>
                        <p>{motivations.today_motivation_per}％</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>{motivations.today_total_commits}</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>{motivations.week_total_commits}</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>{motivations.month_total_commits}</p>
                    </Card>
                </div>
                <Card className={classes.kusa_card}>
                    <h2>Commits & Motivation</h2>
                    <GrassContainer year_motivations={motivations.year_motivations} />
                    <img src="picker_sumple.svg" width="180%" height="30px" />
                </Card>
                <Card className={classes.chart_card}>
                    <CommitMotivationChart
                        week_date={motivations.week_date}
                        week_motivation_per={motivations.week_motivation_per}
                        week_daily_total_commits={motivations.week_daily_total_commits}
                    />
                </Card>
                {/* <Card className={classes.radar_card}>
                    <MotivationDetail />
                </Card> */}
                <Card className={classes.commits_card}></Card>
                <Card className={classes.pie_card}>
                    <DefinitionChart
                        week_definition_names={motivations.week_definition_names}
                        week_definition_sum={motivations.week_definition_sum}
                    />
                </Card>
            </div>
        </div>
    );
}
