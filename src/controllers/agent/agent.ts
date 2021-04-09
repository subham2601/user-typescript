import { Request, Response } from "express";

import { RESPONSE_CODES } from "../../../config/constants";

import {
    agentSignupValidator,
    agentLoginValidator,
    agentUpdateValidator
} from "../../validators/agent";
import {
    agentSignup,
    agentSignin,
    modifyAgent,
    deleteAgent
}  from "../../services/agent/agent"



export const agentRegister  = async (req: Request, res: Response) => {
        const { data } = req.body;
        try {
            const value = await agentSignupValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await agentSignup(data)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    }

export const agentLogin = async (req: Request, res: Response) => {        
        const { data } = req.body;
        try {
            const value = await agentLoginValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await agentSignin(data)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    }

export const agentUpdate = async (req: Request, res: Response) => {        
        const { data } = req.body;
        const { id } = req.params
        try {
            const value = await agentUpdateValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await modifyAgent(data, id)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    }
 
export const agentDelete = async (req: Request, res: Response) => {        
        const { id } = req.params
        try {
            let agentDetails = await deleteAgent(id)
            return res.json(agentDetails)
        }
        catch (err) {
            throw err
        }
    }

