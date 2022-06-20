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
    {username: "narutin", tweet: "SASKEEEE1"},
    {username: "saske", tweet: "NARUTOOOOO"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOoOOo"},
    {username: "narutin", tweet: "SASKEEEeeEEEEEeEEEeeE"},
    {username: "saske", tweet: "NARUTOOOOOoooooooooOOoo"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOOOOOOOOOOOOOOO"},
    {username: "narutin", tweet: "SASKE?"},
    {username: "saske", tweet: "NARUTO."},
    {username: "bobesponja", tweet: "eu amo o hub2"},
    {username: "narutin", tweet: "SASKEEEE"},
    {username: "saske", tweet: "NARUTOOOOO"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOoOOo"},
    {username: "narutin", tweet: "SASKEEEeeEEEEEeEEEeeE"},
    {username: "saske", tweet: "NARUTOOOOOoooooooooOOoo"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOOOOOOOOOOOOOOO"},
    {username: "narutin", tweet: "SASKE?"},
    {username: "saske", tweet: "NARUTO."},
    {username: "bobesponja", tweet: "eu3 amo o hub3"},
    {username: "narutin", tweet: "SASKEEEE"},
    {username: "saske", tweet: "NARUTOOOOO"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOoOOo"},
    {username: "narutin", tweet: "SASKEEEeeEEEEEeEEEeeE"},
    {username: "saske", tweet: "NARUTOOOOOoooooooooOOoo"},
    {username: "narutin", tweet: "SASKEEEEEEEEEEEEEEEEEE"},
    {username: "saske", tweet: "NARUTOOOOOOOOOOOOOOOOO"},
    {username: "narutin", tweet: "SASKE?"},
    {username: "saske", tweet: "NARUTO."},
    {username: "bobesponja", tweet: "eu4 amo o hub4"},
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
    
    function isValidateURL(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    if(req.body.username.length < 1 || !isValidateURL(req.body.avatar)){
        if(!isValidateURL(req.body.avatar) && req.body.avatar.length > 0){
            res.status(400).send("Url Invalida!")
        }
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push(req.body);
    res.status(201).send("OK");
})

server.get("/tweets", (req,res)=>{
    const page = req.query.page
    if(page < 1 ){

        res.status(400).send("Informe uma página válida!")
    }
    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
      }
    const lastTweets = paginate(tweets.slice().reverse(),10,page).map((tweet) => { 
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
    if(req.headers.user.length < 1 || req.body.tweet.length < 1){
        res.status(400).send("Todos os campos são obrigatórios!")
    }
    const newTweet = {
        username: req.headers.user,
        tweet: req.body.tweet
    }
    tweets.push(newTweet);
    res.status(201).send("OK");
})

server.listen(5000);