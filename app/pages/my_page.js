import React, { useState, useEffect } from "react";
import firebase from "../components/firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import { useRouter } from "next/router";
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
import RecentCommits from "../components/my_page/RecentCommits";

import InputCommit from "../components/modal/InputCommit";
import FaceIcon from "@material-ui/icons/Face";

const CommitMotivationChart = dynamic(
    () => import("../components/my_page/CommitMotivationChart"),
    {
        ssr: false,
    }
);
const MotivationDetail = dynamic(
    () => import("../components/my_page/MotivationDetail"),
    {
        ssr: false,
    }
);
const DefinitionChart = dynamic(
    () => import("../components/my_page/DefinitionChart"),
    {
        ssr: false,
    }
);
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "20vw",
        margin: 0,
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
        width: "24%",
        display: "inline-block",
        borderRadius: "20px",
        boxShadow: "none",
        textAlign: "center",
        fontFamily: "Public Sans, sans-serif",
        padding: theme.spacing(3, 0),
        "& h3": {
            fontSize: "1.8rem",
            margin: "0px",
        },
        "& p": {
            fontSize: ".8rem",
            margin: "0px",
            opacity: "0.75",
            fontWeight: "bold",
        },
    },
    motivation_per: {
        color: theme.palette.primary.darker,
        backgroundColor: theme.palette.primary.lighter,
    },
    daily_commits: {
        color: theme.palette.info.darker,
        backgroundColor: theme.palette.info.lighter,
    },
    weekly_commits: {
        color: theme.palette.warning.darker,
        backgroundColor: theme.palette.warning.lighter,
    },
    monthly_commits: {
        color: theme.palette.error.darker,
        backgroundColor: theme.palette.error.lighter,
    },
    icon_wrapper: {
        marginBottom: theme.spacing(1),
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
        overflow: "scroll",
        color: "rgb(37, 48, 66)",
    },
    nav: {
        height: "100vh",
        boxShadow: `4px 4px 20px 0 ${theme.palette.grey[500_8]}`,
    },
    nav_list: {
        padding: "1rem 0 0",
        color: theme.palette.grey[500],
    },
    list_item: {
        paddingLeft: "2.5rem",
    },
    logo: {
        display: "block",
        margin: "0 5%",
    },
    nav_user_name: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.grey[700],
        backgroundColor: theme.palette.grey[200],
        borderRadius: "8px",
        textAlign: "center",
        padding: "1vh 2vw",
        margin: "4vh 3vh",
        "& h3": {
            fontSize: ".8rem",
            textAlign: "center",
            marginLeft: "10px",
        },
    },
    btn_wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "3vh",
    },
    btn_new_commits: {
        color: "rgb(255, 255, 255)",
        backgroundColor: theme.palette.primary.main,
        boxShadow: `4px 4px 8px 0 ${theme.palette.primary.lighter}`,
        padding: "1vh 1.5vw",
        "&:hover": {
            color: "rgb(255, 255, 255)",
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "none",
        },
    },
    btn_logout: {
        color: "rgb(255, 255, 255)",
        backgroundColor: theme.palette.error.main,
        boxShadow: `4px 4px 8px 0 ${theme.palette.error.lighter}`,
        padding: "1vh 1.5vw",
        borderRadius: "20px",
        "&:hover": {
            color: "rgb(255, 255, 255)",
            backgroundColor: theme.palette.error.dark,
            boxShadow: "none",
        },
    },
    total_commits: {
        color: theme.palette.primary.darker,
        backgroundColor: theme.palette.grey[500_8],
        width: "70%",
        display: "inline-block",
        borderRadius: "15px",
        boxShadow: `2px 2px 4px 0 ${theme.palette.grey[500_8]}`,
        textAlign: "center",
        fontFamily: "Public Sans, sans-serif",
        padding: theme.spacing(3, 3),
        margin: "12vh 15% 3vh",
        "& h3": {
            fontSize: "1.8rem",
            margin: "0px",
        },
        "& p": {
            fontSize: ".8rem",
            margin: "0px",
            opacity: "0.75",
            fontWeight: "bold",
        },
    },
}));

const userRepository = RepositoryFactory.get("users");
const motivationRepository = RepositoryFactory.get("motivations");

export default function MyPage() {
    const router = useRouter();
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if (index == 0) {
            router.push("/my_page");
        } else if (index == 1) {
            router.push("/TestCommitDisplay");
        }
    };

    const [userData, setUserData] = useState([]);
    const [userName, setUserName] = useState("");
    const [motivations, setMotivation] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <List
                    component="nav"
                    aria-label="main mailbox folders"
                    className={classes.nav}
                >
                    <img src="truancy_logo.svg" className={classes.logo} />

                    <div className={classes.nav_user_name}>
                        <FaceIcon />
                        <h3>{userName}</h3>
                    </div>
                    <div className={classes.btn_wrapper}>
                        <Button
                            variant="contained"
                            startIcon={<img src="AddIcon.svg" />}
                            onClick={handleClickOpen}
                            className={classes.btn_new_commits}
                        >
                            New Commits
                        </Button>
                        <InputCommit
                            open={open}
                            handleClose={handleClose}
                            userId={userData.id}
                        />
                    </div>

                    <div className={classes.nav_list}>
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            className={classes.list_item}
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
                            className={classes.list_item}
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
                            className={classes.list_item}
                        >
                            <ListItemIcon>
                                <EditOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Difinition" />
                        </ListItem>
                    </div>

                    <Card className={classes.total_commits}>
                        <div className={classes.icon_wrapper}>
                            <img src="tree.svg" />
                        </div>

                        <h3> {motivations.total_commits}</h3>
                        <p>Total Commits</p>
                    </Card>

                    <div className={classes.btn_wrapper}>
                        <Button
                            variant="contained"
                            className={classes.btn_logout}
                        >
                            Logout
                        </Button>
                    </div>
                </List>
            </div>

            <div className={styles.bar}>{`${year}/${month}/${day}`}</div>
            <div className={styles.main_container}>
                <div className={styles.four_card_container}>
                    <Card
                        className={`${classes.motivation_card} ${classes.motivation_per}`}
                    >
                        <div className={classes.icon_wrapper}>
                            <img src="motivation.svg" />
                        </div>
                        <h3>{motivations.today_motivation_per}％</h3>
                        <p>Motivation</p>
                    </Card>
                    <Card
                        className={`${classes.motivation_card} ${classes.daily_commits}`}
                    >
                        <div className={classes.icon_wrapper}>
                            <img src="daily_commits.svg" />
                        </div>
                        <h3>{motivations.today_total_commits}</h3>
                        <p>Daily Commits</p>
                    </Card>
                    <Card
                        className={`${classes.motivation_card} ${classes.weekly_commits}`}
                    >
                        <div className={classes.icon_wrapper}>
                            <img src="weekly_commits.svg" />
                        </div>
                        <h3>{motivations.week_total_commits}</h3>
                        <p>Weekly Commits</p>
                    </Card>
                    <Card
                        className={`${classes.motivation_card} ${classes.monthly_commits}`}
                    >
                        <div className={classes.icon_wrapper}>
                            <img src="monthly_commits.svg" />
                        </div>
                        <h3>{motivations.month_total_commits}</h3>
                        <p>Monthly Commits</p>
                    </Card>
                </div>
                <Card className={classes.kusa_card}>
                    <h2>Commits & Motivation</h2>
                    <GrassContainer
                        year_motivations={motivations.year_motivations}
                    />
                    <img src="picker_sumple.svg" width="180%" height="30px" />
                </Card>
                <Card className={classes.chart_card}>
                    <CommitMotivationChart
                        week_date={motivations.week_date}
                        week_motivation_per={motivations.week_motivation_per}
                        week_daily_total_commits={
                            motivations.week_daily_total_commits
                        }
                    />
                </Card>
                {/* <Card className={classes.radar_card}>
                    <MotivationDetail />
                </Card> */}
                <Card className={classes.commits_card}>
                    <RecentCommits
                        recent_commits={motivations.recent_commits}
                    />
                </Card>
                <Card className={classes.pie_card}>
                    <DefinitionChart
                        week_definition_names={
                            motivations.week_definition_names
                        }
                        week_definition_sum={motivations.week_definition_sum}
                    />
                </Card>
            </div>
        </div>
    );
}
