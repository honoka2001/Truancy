import dynamic from "next/dynamic";
import styles from "../styles/MyPage.module.css";

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
        display: "inline-block",
    },
    commits_card: {
        width: "65%",
        height: "40vh",
        display: "inline-block",
    },
}));
export default function MyPage() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div className={styles.container}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <div className={styles.nav_user_name}>UserName</div>
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

                    <div className={styles.nav_total_commits}>500</div>
                    <Button variant="contained">LogOut</Button>
                </List>
            </div>

            <div className={styles.bar}>2021/08/20</div>
            <div className={styles.main_container}>
                <div className={styles.four_card_container}>
                    <Card className={classes.motivation_card}>
                        <p>50％</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>50％</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>50％</p>
                    </Card>
                    <Card className={classes.motivation_card}>
                        <p>50％</p>
                    </Card>
                </div>
                <Card className={classes.kusa_card}>
                    <p>くさ</p>
                </Card>
                <Card className={classes.chart_card}>
                    <CommitMotivationChart />
                </Card>
                {/* <Card className={classes.radar_card}>
                    <MotivationDetail />
                </Card> */}
                <Card className={classes.commits_card}></Card>
                <Card className={classes.pie_card}>
                    <DefinitionChart />
                </Card>
            </div>
        </div>
    );
}
