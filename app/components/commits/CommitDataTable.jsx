import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIconButton from "./DeleteIconButton";
import DefinitionName from "./DefinitionName";

export default function CommitDataTable(props) {
  const [commits, setCommits] = useState([]);
  const [commitsGet, setCommitsGet] = useState(true);

  const commitPost = async () => {
    try {
      axios
        .get("http://localhost:3000/commits", {
          params: {
            id: props.userId,
          },
        })
        .then(function (res) {
          console.log(res.data);
          setCommits(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "definition",
      headerName: "定義名",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <DefinitionName
          params={params}
        />
      )
    },
    {
      field: "message",
      headerName: "メッセージ",
      width: 400,
      editable: false,
    },
    {
      field: "count",
      headerName: "コミット数",
      type: "number",
      width: 147,
      editable: false,
    },
    {
      field: "date",
      type: "date",
      headerName: "日付",
      sortable: true,
      editable: false,
      width: 180,
    },
    {
      field: " ",
      headerName: " ",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      editable: false,
      sortable: false,
      renderCell: (params) => (
        <DeleteIconButton
          commitId={params}
          commitPost={commitPost}
          userId={props.userId}
        />
      ),
    },
  ];

  const useStyles = makeStyles({
    root: {

    }
  })

  useEffect(() => {
    console.log(props.userId);
    commitPost(props.userId);
  }, [props.userId]);

  return (
    <div style={{ height: 550, width: 1000, margin: "calc(50vh - 310px) auto 0 auto" }}>
      <h2>コミット一覧</h2>
      <DataGrid
        rows={commits}
        columns={columns}
        // pageSize={8}
        disableSelectionOnClick
      />
    </div>
  );
}
