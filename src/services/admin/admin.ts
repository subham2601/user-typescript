import jwt from 'jsonwebtoken';
import { Admin, Agent } from "../../../models"
import { genRandomString, sha512 } from '../../../utils/crypto';
import { RESPONSE_CODES } from '../../../config/constants'
import { IAdmin } from "../../../models/admin/admin.model"


export const adminSignup = async (data: IAdmin) => {
    try {
        let responce = {} as any
        let adminEmail = data.email.toLowerCase()
        let admin = await Admin.findOneByEmail(adminEmail)
        if (admin) {
            responce.status = 'failed'
            responce.message = `admin with ${adminEmail} is already exist in the system`
            responce.code = RESPONSE_CODES.BAD_REQUEST
            return responce;
        }

        const salt = genRandomString(16);
        const hashPassword = sha512(data.password, salt);

        data.password = hashPassword.value;
        data.passwordSalt = hashPassword.salt;
        data.email = adminEmail

        let newadmin = await Admin.create(data)
        let token = await adminPayload(newadmin)
        responce.code = RESPONSE_CODES.POST
        responce.status = 'sucess',
        responce.message = `admin created sucessfully`
        responce.data = token
        return responce
    } catch (error) {
        throw error
    }
}

export const adminSignin = async (data: IAdmin) => {
    try {
        let responce = {} as any
        let adminEmail = data.email.toLowerCase()
        let admin = await Admin.findOneByEmail(adminEmail)
        if (!admin) {
            responce.status = 'failed'
            responce.message = `admin with ${adminEmail} is not exist in the system`
            responce.code = RESPONSE_CODES.BAD_REQUEST
            return responce;
        } else {
            const salt = admin.passwordSalt;
            const hashPassword = sha512(data.password, salt);

            if (hashPassword.value !== admin.password) {
                responce.status = 'failed'
                responce.message = `The entered password for admin ${adminEmail} is wrong`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                let token = await adminPayload(admin)
                responce.code = RESPONSE_CODES.POST
                responce.status = 'sucess',
                responce.message = `admin logged sucessfully`
                responce.data = token
                return responce
            }
        }
    } catch (error) {
        throw error
    }
}

export const getAgents = async () => {
    try {
        let responce = {} as any
        let agents = await Agent.find()
        responce.code = RESPONSE_CODES.POST
        responce.status = 'sucess',
        responce.message = `All agents`
        responce.data = agents
        return responce
    } catch (error) {
        throw error
    }
}



let adminPayload = (admin: any) => {
    const tokenPayload = {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'Admin'
    };
    const token = jwt.sign(tokenPayload, '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe', { expiresIn: 60 * 60 * 24 * 30 });

    return token;
}
