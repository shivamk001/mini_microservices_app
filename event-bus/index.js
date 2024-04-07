const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());

app.post('/events', async (req, res)=>{
    const event=req.body;
    console.log('EVENT:', event)
    // to posts
    // await axios.post('http://localhost:4000/events', event);
    // to comments
    // await axios.post('http://localhost:4001/events', event);
    // to query
    await axios.post('http://localhost:4002/events', event);

    res.send({status: 'OK'});
})

app.listen(4005, ()=>{
    console.log('LISTENING ON 4005')
});