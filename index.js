import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

const users = [
    {
	    username: 'bobesponja', 
	    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
    },
    {
        username: 'narutin', 
        avatar: "https://i0.wp.com/www.jbox.com.br/wp/wp-content/uploads/2021/10/narutofeliz-destacada.jpg?fit=774%2C489&quality=99&strip=all&ssl=1" 
    },
    {
        username: 'saske', 
        avatar: "https://http2.mlstatic.com/D_NQ_NP_186211-MLB20511782084_122015-O.webp" 
    }
];
const tweets = [
    {username: "bobesponja", tweet: "eu amo o hub"},
    {username: "narutin", tweet: "SASKEEEE"},
    {username: "saske", tweet: "NARUTOOOOO"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOoOOo"},
    {username: "narutin", tweet: "SASKEEEeeEEEEEeEEEeeE"},
    {username: "saske", tweet: "NARUTOOOOOoooooooooOOoo"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOOOOOOOOOOOOOOO"},
    {username: "narutin", tweet: "SASKE?"},
    {username: "saske", tweet: "NARUTO."}

];

server.post("/sign-up", (req, res)=>{
    users.push(req.body);
    res.send("OK");
})

server.get("/tweets", (req,res)=>{
    const lastTweets = tweets.slice(-10).reverse().map((tweet) => { //Usei o reverse para os tweets do usuário aparecer no top, igual no twitter. 
        const userTweet = users.find((user)=> user.username === tweet.username);
        return ({
        "username": tweet.username,
        "avatar": userTweet.avatar,
        "tweet": tweet.tweet
        })
    })
    res.send(lastTweets);
})
server.post("/tweets", (req,res)=>{
    tweets.push(req.body);
    res.send("OK");
})

server.listen(5000);