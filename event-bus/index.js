const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());

const events=[];

app.post('/events', async (req, res)=>{
    console.log('Events Received:', req.body.type);
    const event=req.body;
    console.log('EVENT:', event);

    events.push(event);

    // to posts
    await axios.post('http://posts-clusterip-srv:4000/events', event);
    // to comments
    await axios.post('http://comments-srv:4001/events', event);
    // to query
    // await axios.post('http://query-srv:4002/events', event);
    // to moderation
    // await axios.post('http://moderartion-srv:4003/events', event);

    res.send({status: 'OK'});
});

app.get('/events', (req, res)=>{
    res.send(events);
});

app.listen(4005, ()=>{
    console.log('LISTENING ON 4005: EVENTBUS')
});