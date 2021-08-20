import dynamic from "next/dynamic";
import styles from "../styles/MyPage.module.css";

import Card from "@material-ui/core/Card";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

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
    },
    motivation_card: {
        width: "23%",
        height: "14vh",
        display: "inline-block",
    },
    kusa_card: {
        width: "100%",
        height: "25vh",
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
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folder">
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem
                        button
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemText primary="Spam" />
                    </ListItem>
                </List>
            </div>
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
