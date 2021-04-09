import express from "express";
import { authorize } from "../../_helpers/authorize"
import { Admin } from "../../_helpers/role"
import { adminRegister, 
         adminLogin,
         getAllAgents
         } from "../controllers/admin/admin"
 /**
  * Controller Definitions
  */
 export const adminRouter = express.Router();
 
 adminRouter.post("/register", adminRegister)

 adminRouter.post("/login", adminLogin)

 adminRouter.get("/get-agents", authorize(Admin), getAllAgents)




 
 
 
   
 
