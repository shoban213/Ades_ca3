const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
const PORT = process.env.PORT || 8080

const mongoDB = "mongodb+srv://shoban:Shoban999@cluster0.cmcq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection successful")
}).catch((error) => {
    console.log("connection failed", error)
});;

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo');
})

app.listen(PORT, console.log(`server started at ${PORT}`))

//schema
const Schema = mongoose.Schema
const gameSchema = new Schema({

    name: String,
    release_date: String,
    genre: String,
    platform: String,
    image: String,
    synopsis: String,
    price: String,
    trailer: String,
    ratings: String,
    made_by: String


})

const likeSchema = new Schema({
   likes: String
})
//model
const likeModel = mongoose.model('like',likeSchema)
const game = mongoose.model('data', gameSchema)
//saving data to our mongo database
// const data = {
//     name: "The Elder Scrolls V: Skyrim",
//         release_date: "11 November 2011",
//         genre: "Action,Adventure,RPG",
//         platform: "Xbox , PlayStation , PC",
//         image : "https://techcrunch.com/wp-content/uploads/2019/02/skyrim.jpg",
//         synopsis : "The game's main story revolves around the player's character, the Dragonborn, on their quest to defeat Alduin the World-Eater, a dragon who is prophesied to destroy the world.",
//         price : "$20",
//         trailer : "https://www.youtube.com/watch?v=JSRtYpNRoN0",
//         ratings : "94%",
//         made_by :"Bethesda Game Studios"
// }

// const newGame = new game(data);

// newGame.save((error)=>{
//     if(error){
//         console.log('there has been an error')
//     }else{
//         console.log("data has been saved")
//     }

// })



//------------------------------------------------------
//routes
app.get('/api/getGames', function (req, res) {
    game.find({})
        .then((data) => {

            console.log('data', data)
            res.json(data)
        }).catch((error) => {
            console.log(error, data)
        })

})

app.post('/api/postLikes', function (req, res) {
    const data = {
        likes : "like"
    }
    const newLike = new likeModel(data)
    newLike.save()
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})

app.get('/api/getLikes', function (req, res) {
    likeModel.find({})
        .then((data) => {

            console.log('like', data.length)
            res.json(data.length)
        }).catch((error) => {
            console.log(error, data)
        })

})


