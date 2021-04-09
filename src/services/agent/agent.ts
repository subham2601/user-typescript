import jwt from 'jsonwebtoken';
import { Agent } from "../../../models"
import { genRandomString, sha512 } from '../../../utils/crypto';
import { RESPONSE_CODES } from '../../../config/constants'
import { IAgent } from "../../../models/agent/agent.model"
 

export const agentSignup = async (data: IAgent) => {
        try {
            let responce = {} as any;
            let agentEmail = data.email.toLowerCase()
            let agent = await Agent.findOneByEmail(agentEmail)
            if (agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is already exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            }

            const salt = genRandomString(16);
            const hashPassword = sha512(data.password, salt);

            data.password = hashPassword.value;
            data.passwordSalt = hashPassword.salt;
            data.email = agentEmail

            let newAgent = await Agent.create(data)
            let token = await agentPayload(newAgent)
            responce.code = RESPONSE_CODES.POST
            responce.status = 'sucess',
            responce.message = `agent created sucessfully`
            responce.data = token
            return responce
        } catch (error) {
            throw error
        }
    }
export const agentSignin = async (data: IAgent) => {
        try {
            let responce = {} as any
            let agentEmail = data.email.toLowerCase()
            let agent = await Agent.findOneByEmail(agentEmail)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                const salt = agent.passwordSalt;
                const hashPassword = sha512(data.password, salt);

                if (hashPassword.value !== agent.password) {
                    responce.status = 'failed'
                    responce.message = `The entered password for agent ${agentEmail} is wrong`
                    responce.code = RESPONSE_CODES.BAD_REQUEST
                    return responce;
                } else {
                    let token = await agentPayload(agent)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent logged sucessfully`
                    responce.data = token
                    return responce
                }
            }
        } catch (error) {
            throw error
        }
    }

    export const modifyAgent = async (data: IAgent, id: String) => {
             try {
            let responce = {} as any
            let agent = await Agent.findById(id)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agent.email} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                await Agent.updateById(data, id)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent update sucessfully`
                    return responce
                }
        } catch (error) {
            throw error
        }
    }

export const deleteAgent = async (id: String) => {
          try {
            let responce = {} as any
            let agent = await Agent.findById(id)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agent.email} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                await Agent.deleteById(id)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent deleted sucessfully`
                    return responce
                }
        } catch (error) {
            throw error
        }
}

let agentPayload = (agent: any) => {
    const tokenPayload = {
        id: agent._id,
        email: agent.email,
        name: agent.name,
        role: 'Agent'
    };
    const token = jwt.sign(tokenPayload, '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe', { expiresIn: 60 * 60 * 24 * 30 });

    return token;
}