import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"

//import * as ItemService from './items/item.service'
import {itemsRouter} from './items/item.rounter'

dotenv.config()

const app = express()
app.set('view engine','hbs')

//login configuratation
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://securedservice.onrender.com',
  clientID: '0kcwoHTo9cb4pNKi52SbGGpmSUtboP2Z',
  issuerBaseURL: 'https://dev-e42be0kavg8dfspb.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    const isLoggedIn = req.oidc.isAuthenticated()
    console.log(req.oidc.user)
    res.render('index',{loginStatus: isLoggedIn,userName:req.oidc.user});
});

app.get('/callback',(req,res)=>{
  res.render('loginok')
})

  
app.use('/api/menu/items',itemsRouter)

// app.get('/',(req,res)=>{
//     res.status(200).send(ItemService.findAll());
//     console.log(ItemService.findAll())
//     res.end();
// })

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{console.log("Server is up at port:", PORT)})