import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    const headerToken = req.headers['authorization']
    console.log('headerToken');
    if(headerToken != undefined && headerToken.startsWith('Bearer')){
        //Tiene Token
        try{
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'cisco123');
            next()
        }catch(eror){
            res.status(401).json({
                msg: 'token no valido'
            })
        }
    }
    else{
        res.status(401).json({
            msg: 'Acceso Denegado ->ValidateToken'
        })
    }
}
export default validateToken;