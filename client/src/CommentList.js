import React from "react";
// import axios from 'axios';

const CommentList=({ comments })=>{
    // const [comments, setComments]=useState([]);

    // const fetchComments=async ()=>{
    //     const res=await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    //     setComments(res.data);
    // }
    // useEffect(()=>{
    //     fetchComments();

    // },  []);

    const renderedComments=comments.map(comment=>{
        let content;

        if(comment.status==='approved')
            content=comment.content;
        else if(comment.status==='pending')
            content='Awaitng Moderation';
        else if(comment.status==='rejected')
            content='Comment Rejected'
        return <li key={comment.id}>{content}</li>
    })
    return (<ul>
        {renderedComments}
    </ul>);
}

export default CommentList;


