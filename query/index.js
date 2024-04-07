const express=require('express');
const bodyParser=require('body-parser')
// const { randomBytes }=require('crypto');
const cors=require('cors');
// const axios=require('axios');


const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={}

app.get('/posts', (req, res)=>{
    res.send(posts);
})

app.post('/events', (req, res)=>{
    const {type, data}=req.body;

    if(type==='PostCreated'){
        const {id, title}=data;
        posts[id]={id, title, comments: []};
    }

    if(type==='CommentCreated'){
        const {id, comment, postId}=data;
        console.log(id,comment, postId);
        const post=posts[postId];
        post.comments.push({id, comment});
    }
    console.log(posts)
    res.send({});
})

app.listen(4002, ()=>{
    console.log('LISTENING ON 4002')
})