import { CustomError } from "../Model/CustonError"
import { buyerDataDTO, buyerDB, ClientDB, creditCardDataDTO, creditCardDB, paymentBoleto, paymentCreditCard } from "../Model/types"
import BaseDataBase from "./BaseDataBase"


export class PaymentData extends BaseDataBase {
    
    getClientById = async (id:string):Promise<ClientDB | {}> => {
        try {
            const resultDB = await BaseDataBase.connection('Wirecard_client_id').select('*').where({id})
            if(resultDB.length == 0) {
                return {}
            }
            const result: ClientDB = {id: resultDB[0].id, name: resultDB[0].name}
            return result
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message);
        } 
    }

    getBuyer = async (buyer:buyerDataDTO):Promise<buyerDB | {}> => {
        try {
            const resultDB = await BaseDataBase.connection('Wirecard_Buyer').select('').where(buyer)
            if(resultDB.length == 0) {
                return {}
            }
            const result: buyerDB = {
                id: resultDB[0].id, 
                buyer_name: resultDB[0].buyer_name,
                buyer_email: resultDB[0].buyer_email,
                buyer_CPF: resultDB[0].buyer_CPF
            }
            return result
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message);
        }
    }

    register_buyer = async (buyer:buyerDB):Promise<void> => {
        try {
            await BaseDataBase.connection('Wirecard_Buyer').insert(buyer)
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message);
        }
    }

    getCreditCard = async (creditCard:creditCardDataDTO):Promise<creditCardDB | {}> => {
        try {
            const resultDB = await BaseDataBase.connection('Wirecard_CredidCard').select('').where(creditCard)
            if(resultDB.length == 0) {
                return {}
            }
            const result: creditCardDB = {
                id: resultDB[0].id, 
                card_name: resultDB[0].card_name,
                card_number: resultDB[0].card_number,
                card_expiration: resultDB[0].card_expiration,
                card_CVV: resultDB[0].card_CVV
            }
            return result
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message);
        }
    }

    registerCreditCard = async (creditCard:creditCardDB):Promise<void> => {
        try {
            await BaseDataBase.connection('Wirecard_CredidCard').insert(creditCard)
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }
    }

    registerPaymentBoleto = async (payment:paymentBoleto):Promise<void> => {
        try {
            return await BaseDataBase.connection('Wirecard_Payment_Boleto').insert(payment)
        } catch (error:any) {
            console.log(error)
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    registerPaymentCreditCard = async (payment:paymentCreditCard):Promise<void> => {
        try {       
            await BaseDataBase.connection('Wirecard_Payment_CreditCard').insert(payment)
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }
    }

    statusPaymentBoleto = async (id:string) => {
        
        try {
            return await BaseDataBase.connection('Wirecard_Payment_Boleto').select(
                'Wirecard_client_id.id as ClientID','Wirecard_client_id.name as Client name',
                'Wirecard_Buyer.id as Buyer ID', 'Wirecard_Buyer.buyer_name as Buyer name ', 
                'Wirecard_Buyer.buyer_email as Buyer email', 'Wirecard_Buyer.buyer_CPF as Buyer CPF',
                'Wirecard_Payment_Boleto.id as Payment ID', 'Wirecard_Payment_Boleto.amount as Amount',
                'Wirecard_Payment_Boleto.status as Status'
            )
            .join('Wirecard_client_id','Wirecard_client_id.id','=','Wirecard_Payment_Boleto.clientId')
            .join('Wirecard_Buyer','Wirecard_Buyer.id','=','Wirecard_Payment_Boleto.buyerId')
            .where("Wirecard_Payment_Boleto.id",id)
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }
    }

    statusPaymentCreditCard = async (id:string) => {
        
        try {
            return await BaseDataBase.connection('Wirecard_Payment_CreditCard').select(
                'Wirecard_client_id.id as ClientID','Wirecard_client_id.name as Client name',
                'Wirecard_Buyer.id as Buyer ID', 'Wirecard_Buyer.buyer_name as Buyer name ', 
                'Wirecard_Buyer.buyer_email as Buyer email', 'Wirecard_Buyer.buyer_CPF as Buyer CPF',
                'Wirecard_CredidCard.id as CreditCard id', 'Wirecard_CredidCard.card_name as CreditCard name',
                'Wirecard_CredidCard.card_number as Creditcard number', 'Wirecard_CredidCard.card_expiration as creditCard Card expiration',
                'Wirecard_CredidCard.card_CVV as Creditcard CVV',
                'Wirecard_Payment_CreditCard.amount as Amount',
                'Wirecard_Payment_CreditCard.status as Status'
            )
            .join('Wirecard_client_id','Wirecard_client_id.id','=','Wirecard_Payment_CreditCard.clientId')
            .join('Wirecard_Buyer','Wirecard_Buyer.id','=','Wirecard_Payment_CreditCard.buyerId')
            .join('Wirecard_CredidCard','Wirecard_CredidCard.id','=','Wirecard_Payment_CreditCard.creditCard')
            .where("Wirecard_Payment_CreditCard.id",id)
        } catch (error:any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }
    }
}

export default new PaymentData()