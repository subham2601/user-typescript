// import secret from process.env.JWT_SECRET
import expressJwt from 'express-jwt'
import { Admin, Agent } from '../models'
const secret: any = '8a0d0d09-af24-4c9f-88cf-b12f5c4837fe'

interface Iuser {
    email: String,
    role: [],
}

export const authorize = (roles: any) => {
    if (typeof roles == 'string') {
        roles = [roles]
    }
    return [
                // authenticate JWT token and attach user to request object (req.user)
                expressJwt({ secret , algorithms: ['HS256']}),
        
                // authorize based on user role
                (req: any, res: any, next: any) => {
                    let user: Iuser = req.user
                    if (roles.length && !roles.includes(user.role)) {
                        // user's role is not authorized
                        return res.status(401).json({ message: 'Unauthorized' })
                    }
                    switch (req.user.role) {
                        case 'Admin':
                            Admin.findOneByEmail(req.user.email).then(
                                (user: any) => {
                                    if (user) {
                                        req.user = user
                                        req.userType = 'Admin'
                                        // authentication and authorization successful
                                        next()
                                    } else {
                                        return res
                                            .status(404)
                                            .json({ message: 'User Not Found' })
                                    }
                                }
                            )
                            break;
                    }
                }
        
            ]
}

