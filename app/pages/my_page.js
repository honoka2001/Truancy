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
        width: "100%",
        height: "100vh",
        maxWidth: 300,
        margin: 0,
        display: "inline-block",
        backgroundColor: theme.palette.background.paper,
    },
    chart_card: {
        display: "inline-block",
        maxWidth: 360,
    },
}));
export default function MyPage() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div>
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
            <Card className={classes.chart_card}>
                <CommitMotivationChart style="display:inline-block" />
            </Card>
            <MotivationDetail />
            <DefinitionChart />
        </div>
    );
}
