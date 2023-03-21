import express from 'express'
import { checkJwt } from '../middleware/authz.middleware'
import * as ItemService from './item.service'

export const itemsRouter = express.Router()

itemsRouter.use(checkJwt)

itemsRouter.get('/',async (req,res)=>{
    res.status(200).send(await ItemService.findAll()); 
})
itemsRouter.get('/:id',(req,res)=>{
    res.status(200).send(ItemService.find(Number.parseInt(req.params.id)))
})