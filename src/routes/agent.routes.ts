import express from "express";
import { agentRegister, 
         agentLogin, 
         agentUpdate, 
         agentDelete } from "../controllers/agent/agent"
 /**
  * Controller Definitions
  */
 export const agentRouter = express.Router();
 
 agentRouter.post("/register", agentRegister)

 agentRouter.post("/login", agentLogin)

 agentRouter.put('/update/:id', agentUpdate)

 agentRouter.delete('/delete-agent/:id', agentDelete)



 
 
 
   
 
