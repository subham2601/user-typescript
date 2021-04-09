import { Request, Response } from "express";

import { RESPONSE_CODES } from "../../../config/constants";
import {
    adminSignupValidator,
    adminLoginValidator
} from '../../validators/admin';
import {
    adminSignup,
    adminSignin,
    getAgents
} from "../../services/admin/admin";


export const adminRegister = async (req: Request, res: Response) => {
    const { data } = req.body;
    try {
        const value = await adminSignupValidator.validate(data);
        if (value.error && value.error.details.length > 0) {
            return res.json({
                status: 'failed',
                message: value.error.details[0].message,
                code: RESPONSE_CODES.BAD_REQUEST
            });
        } else {
            let adminDetails = await adminSignup(data)
            return res.json(adminDetails)
        }
    }
    catch (err) {
        throw err
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    const { data } = req.body;
    try {
        const value = await adminLoginValidator.validate(data);
        if (value.error && value.error.details.length > 0) {
            return res.json({
                status: 'failed',
                message: value.error.details[0].message,
                code: RESPONSE_CODES.BAD_REQUEST
            });
        } else {
            let adminDetails = await adminSignin(data)
            return res.json(adminDetails)
        }
    }
    catch (err) {
        throw err
    }
}

export const getAllAgents = async (req: Request, res: Response) => {
    try {
        let agents = await getAgents()
        return res.json(agents)
    }
    catch (err) {
        throw err
    }
}