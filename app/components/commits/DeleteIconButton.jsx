import { IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import axios from 'axios';
import React from 'react';

export default function DeleteIconButton(props) {

    const handleClick = () => {
        console.log(props.commitId);
        try{
            axios.delete("http://localhost:3000/commits/" + props.commitId.id)
            .then(function (res) {
                console.log(res);
                props.commitPost(props.userId);
            })
        } catch (err) {
            console.log(err);
        }
        
    }
    return (
        <IconButton aria-label="delete" onClick={handleClick}>
            <DeleteOutlined />
        </IconButton>
    )
}