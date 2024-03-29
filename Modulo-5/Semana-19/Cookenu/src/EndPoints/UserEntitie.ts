import { Request, Response } from "express";
import UserDataBase from "../Data/UserDataBase";
import {User, USER_ROLE} from "../Model/Entities/User";
import { AuthenticationData } from "../Model/Types";
import Authentication from "../Services/Authentication";
import { HashManager } from "../Services/HashManager";
import IdGenerator from "../Services/IDGenerator";
import DataChecking from "./DataChecking/dataChecking";

export default class UserEntitie {
    SignUp = async (req:Request,res:Response):Promise<void> => {
        let statusCode = 201
        const {nome,email,password,role} = req.body
        try {
            const dataChecking = new DataChecking()
            const checking = await dataChecking.signUp(nome,email,password,role)
            if(checking) {
                statusCode = checking.statusCode
                throw new Error(checking.message)
            }
            const idGenerator = new IdGenerator()
            const id = idGenerator.generator()

            const hash = new HashManager()
            const cypherpassword = hash.hash(password)

            const user = new User(id,nome,email,cypherpassword,role)
            const userDB = new UserDataBase()
            await userDB.create(user)

            const payload = { id, role}
            const authentication = new Authentication()
            const token = authentication.generateToken(payload)

            res.status(statusCode).send({token})
        } catch (error:any) {
            res.status(statusCode).send(error.message)
        }
    }

    Login = async (req:Request,res:Response):Promise<void> => {
        let statusCode = 200
        const {email,password} = req.body
        try {
            const dataChecking = new DataChecking()
            const checking = dataChecking.Login(email,password)
            if(checking) {
                statusCode = checking.statusCode
                throw new Error(checking.message)
            }

            const userDB = new UserDataBase()
            const user = await userDB.getByEmail(email)
            if(!user) {
                statusCode = 404
                throw new Error('Usuário não encontrado!')
            }

            const hash = new HashManager()
            if(user.getEmail() !== email || ( User && !hash.compare(password,user.getPassword()))){
                statusCode = 401
                throw new Error('Email ou senha incorretos!')
            }

            const payload:AuthenticationData = { id: user.getId(), role: user.getRole()}
            const authentication = new Authentication()
            const token = authentication.generateToken(payload)
            res.status(statusCode).send({token})
        } catch (error:any) {
            res.status(statusCode).send(error.message)
        }
    }

    Profile = async (req:Request,res:Response) => {
        let statusCode = 200
        const token = req.headers.authorization as string
        try {
            const dataChecking = new DataChecking()
            const checking = dataChecking.Profile(token)
            if(checking) {
                statusCode = checking.statusCode
                throw new Error(checking.message)
            }
            const authentication = new Authentication()
            const tokenData = authentication.getTokenData(token)
            const userDB = new UserDataBase()
            const user = await userDB.getById(tokenData.id)
            if(!user) {
                statusCode = 404
                throw new Error('Usuário não encontrado!')
            }
            res.status(statusCode).send({id:user.getId(),nome: user.getName(),email:user.getEmail()})
        } catch (error:any) {
            if(error.message.includes('jwt')) {
                statusCode = 401
                error.message = 'Token expirado'
            }
            res.status(statusCode).send(error.message)
        }
    }

    getById = async (req:Request,res:Response) => {
        let statusCode = 200
        const token = req.headers.authorization as string
        const id = req.params.id
        try {
            const dataChecking = new DataChecking()
            const checking = dataChecking.getById(token,id)
            if(checking) {
                statusCode = checking.statusCode
                throw new Error(checking.message)
            }

            const authentication = new Authentication()
            const tokenData = authentication.getTokenData(token)

            const userDB = await new UserDataBase().getById(id)
            if(!userDB) {
                statusCode = 404
                throw new Error('Usuário não encontrado!')
            }

            res.status(statusCode).send({user:userDB})
        } catch (error:any) {
            if(error.message.includes('jwt')) {
                statusCode = 401
                error.message = 'Token expirado'
            }
            res.status(statusCode).send(error.message)
        }
    }

    delete = async (req:Request,res:Response) => {
        let statusCode = 200
        const token = req.headers.authorization as string
        const {id} = req.body
        try {
            const dataChecking = new DataChecking()
            const checking = dataChecking.delete(token, id)
            if(checking) {
                statusCode = checking.statusCode
                throw new Error(checking.message)
            }

            const tokenData = new Authentication().getTokenData(token)

            const userDB = await new UserDataBase().getById(id)

            if(!userDB) {
                statusCode = 404
                throw new Error('Usuário não encontrada!')
            }
            if(tokenData.role === USER_ROLE.NORMAL && userDB.getId() !== tokenData.id){
                statusCode = 401
                throw new Error('Apenas Usuários com privilégios de ADMINISTRADOR podem deletar contas que não são suas.')
            }
            
            res.status(statusCode).send(await new UserDataBase().delete(id))
        } catch (error:any) {
            if(error.message.includes('jwt')) {
                statusCode = 401
                error.message = 'Token expirado'
            }
            res.status(statusCode).send(error.message)
        }
    }
}

