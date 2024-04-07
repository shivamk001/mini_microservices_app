const express=require('express');
const bodyParser=require('body-parser')
const { randomBytes }=require('crypto');
const cors=require('cors');
const axios=require('axios');
const { log } = require('console');
const { stat } = require('fs');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId={}; 

app.get('/posts/:id/comments', (req, res)=>{
    console.log(commentsByPostId)
    console.log(req.params.id)
    res.send(commentsByPostId[req.params.id]||[]);//if no comment exists for the post
});

app.post('/posts/:id/comments', async (req, res)=>{
    try{
        const commentId=randomBytes(4).toString('hex');
        const {content}=req.body;
    
        const comments=commentsByPostId[req.params.id] || [];//if no comment exists for the post
        
        comments.push({id: commentId, content, status: 'pending'});
    
        commentsByPostId[req.params.id]=comments;
        console.log('COMMENT CREATED:', commentId, content, comments);
        // to event-bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            data:{
                id: commentId, 
                content, 
                postId: req.params.id,
                status: 'pending'
            }
        });
        
        res.status(201).send(comments);
    }
    catch(err){
        console.log(err);
    }

});

app.post('/events', async (req, res)=>{
    console.log('Events Received:', req.body.type);

    const {type, data}=req.body;

    if(type=='CommentModerated'){
        const {postId, id, status, content}=data;

        const comments=commentsByPostId[postId];
        const requiredComment=comments.find(comment=>{
            return comment.id==id;
        })

        requiredComment.status=status;
        // dont need to insert the comment inside comments

        await axios.post('http://localhost:4005/events',{
            type:'CommentUpdated',
            data:{
                id,
                postId,
                content,
                status
            }
        })
    }
    res.send({})
});

app.listen(4001, ()=>{
    console.log('LISTENING ON 4001: COMMENTS')
});