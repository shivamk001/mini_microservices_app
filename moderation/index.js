const express=require('express');
const bodyParser=require('body-parser');
// const { randomBytes }=require('crypto');
// const cors=require('cors');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());

app.post('/events', async (req, res)=>{
    console.log('Events Received:', req.body.type);
    const {type, data}=req.body;

    if(type=='CommentCreated'){
        const status=data.content.includes('orange')?'rejected':'approved';
        console.log(status)
        await axios.post('http://localhost:4005/events', {
            type:'CommentModerated',
            data:{
                id: data.id,
                postId: data.postId,
                status,
                content: data.content 
            }
        })
    }
    res.send({});
});

app.listen(4003, ()=>{
    console.log('LISTENING ON 4003: MODERATION');
});