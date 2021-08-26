import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import firebase from "../components/firebase";
import { useRouter } from "next/router";
import CommitDataTable from "../components/commits/CommitDataTable";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CallMadeIcon from "@material-ui/icons/CallMade";
import FaceIcon from "@material-ui/icons/Face";
import Button from "@material-ui/core/Button";
import InputCommit from "../components/modal/InputCommit";
import Card from "@material-ui/core/Card";

import styles from "../styles/CommitsIndex.module.css";
const userRepository = RepositoryFactory.get("users");
const motivationRepository = RepositoryFactory.get("motivations");
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
export default function CommitModal() {
    const classes = useStyles();
    const [userId, setUserId] = useState("");
    const router = useRouter();

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

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
                            className={{ selected: classes.selectedTab }}
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
            <div className={styles.main_container}>
                <CommitDataTable userId={userData.id} />
            </div>
        </div>
    );
}
