import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Button, IconButton } from "@material-ui/core";
import DeleteIconButton from "./DeleteIconButton";

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
      field: "name",
      headerName: "定義名",
      width: 180,
      editable: false,
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
      width: 180,
      editable: false,
    },
    {
      field: "date",
      headerName: "日付",
      sortable: true,
      editable: false,
      width: 180,
    },
    {
      field: "",
      headerName: "",
      sortable: false,
      width: 110,
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

  useEffect(() => {
    console.log(props.userId);
    commitPost(props.userId);
  }, [props.userId]);

  return (
    <div style={{ height: 400, width: 1080, margin: "auto" }}>
      <h2>コミット一覧</h2>
      <DataGrid
        rows={commits}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}
