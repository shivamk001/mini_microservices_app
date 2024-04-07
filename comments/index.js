const express=require('express');
const bodyParser=require('body-parser')
const { randomBytes }=require('crypto');
const cors=require('cors');
const axios=require('axios');

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
        const {comment}=req.body;
    
        const comments=commentsByPostId[req.params.id] || [];//if no comment exists for the post
        
        comments.push({id: commentId, comment});
    
        commentsByPostId[req.params.id]=comments;
        console.log('COMMENT CREATED:', commentId, comment, comments)
        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            data:{
                id: commentId, 
                comment, 
                postId: req.params.id
            }
        });
        
        res.status(201).send(comments);
    }
    catch(err){
        console.log(err);
    }

});

app.listen(4001, ()=>{
    console.log('LISTENING ON 4001')
})