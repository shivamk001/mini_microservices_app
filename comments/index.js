const express=require('express');
const bodyParser=require('body-parser')
const { randomBytes }=require('crypto');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId={}; 

app.get('/posts/:id/comments', (req, res)=>{
    console.log(commentsByPostId)
    console.log(req.params.id)
    res.send(commentsByPostId[req.params.id]||[]);//if no comment exists for the post
});

app.post('/posts/:id/comments', (req, res)=>{
    const commentId=randomBytes(4).toString('hex');
    const {comment}=req.body;

    const comments=commentsByPostId[req.params.id] || [];//if no comment exists for the post
    
    comments.push({id: commentId, comment});

    commentsByPostId[req.params.id]=comments;
    
    res.status(201).send(comments);
});

app.listen(4001, ()=>{
    console.log('LISTENING ON 4001')
})