const express=require('express');
const bodyParser=require('body-parser')
const { randomBytes }=require('crypto');
const cors=require('cors');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={}

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware/route handler
});

app.get('/posts', (req, res)=>{
    console.log('POSTS', posts);
    res.send(posts)
});

app.post('/posts', async (req, res)=>{
    const id=randomBytes(4).toString('hex');
    console.log('CREATE POST:', req.body, id);
    const {title}=req.body;
    
    posts[id]={
        id, title
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data:{
            id, title
        }
    });

    console.log(posts)
    res.status(201).send(posts[id]);
});

app.post('/events', async (req, res)=>{
    console.log('Events Received:', req.body.type);
    res.send({})
});

app.listen(4000, ()=>{
    console.log('LISTENING ON 4000: POSTS')
})