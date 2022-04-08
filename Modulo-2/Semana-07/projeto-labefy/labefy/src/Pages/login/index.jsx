import React from "react";
import { ContainerCreateUser, ContainerLogin } from "./style";

export default class Login extends React.Component {
    state = {
        userCreat: false,
        userlogin: false,
        inputCreat: "",
        inputLogin: '',
    }

    userCreation = () => {
        this.state.userCreat === false ? this.setState({ userCreat: true }) : this.setState({ userCreat: false })
        this.setState({ inputCreat: "" })
    }
    userLogged = () => {
        this.state.userlogin === false ? this.setState({ userlogin: true }) : this.setState({ userlogin: false })
        this.setState({ inputLogin: "" })
    }
    handleInputCreat = (e) => {
        this.setState({ inputCreat: e.target.value })
    }
    handleInputLogin = (e) => {
        this.setState({ inputLogin: e.target.value })
    }
    saveLocalStorage = () => {
        if (this.state.inputCreat !== '') {
            const toString = this.state.inputCreat.toString()
            if (localStorage.getItem(toString.trim())) {
                alert('Esse usuario já existe, por favor escolha outro!')
            } else {
                localStorage.setItem(toString, JSON.stringify(this.state.inputCreat))
                this.userCreation()
            }
        } else alert('Digite um nome de Usuário para cadastrar')
    }
    checkUser = () => {
        if (localStorage.getItem(this.state.inputLogin)) {
            this.props.logged()
            this.props.setAuthorization(this.state.inputLogin)
            this.userLogged()
            this.setState({ inputLogin: '' })
        } else {
            alert('Usuario não cadastrado')
        }
    }
    render() {
        const { userCreat, userlogin, inputCreat, inputLogin } = this.state
        return (
            <>
                <h1>LabeFy</h1>
                <h2>A App de playlist musicas da Nação Labenu</h2>
                <p>Acesse sua playlist com seu Usuário ou crie um se ainda tiver!</p>
                {(userCreat === false && userlogin === false) && <button onClick={this.userCreation} >Cadastrar</button>}
                {userCreat &&
                    <ContainerCreateUser>
                        <p>Crie seu usuário</p>
                        <p>Use nuúmeros, letras ou letras e números</p>
                        <input placeholder="Crie um Usuário" onChange={this.handleInputCreat} value={inputCreat} />
                        <button onClick={this.saveLocalStorage} >Criar Usuário</button>
                        <button onClick={this.userCreation}>Cancelar</button>
                    </ContainerCreateUser>}
                {(userCreat === false && userlogin === false) && <button onClick={this.userLogged} >Acessar</button>}
                {userlogin &&
                    <ContainerLogin>
                        <p>Acesse suas playlists</p>
                        <input placeholder="Digite seu Usuário" onChange={this.handleInputLogin} value={inputLogin} />
                        <button onClick={this.checkUser} >Login</button>
                        <button onClick={this.userLogged}>Cancelar</button>
                    </ContainerLogin>}
            </>
        )
    }

}