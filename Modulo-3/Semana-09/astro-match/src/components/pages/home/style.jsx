import styled from 'styled-components'

export const PhotoProfile = styled.img`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border: 5px solid black;
`
export const ContainerHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    p{
        margin: 0;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        font-size: 20px;
        color: black;
        font-weight: 500;
    }
`
export const ContainerProfile = styled.div`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        border: 5px solid black;
        margin: 20px;
        padding: 10px;
        gap: 20px;
        max-width: 400px;
        width: 100%;
        background: linear-gradient(135deg,#f31afe3b,#44dbe642);
        div:nth-child(1){
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            button{
                background-color: transparent;
                border: none;
                width: 80px;
                img{
                    width: 60px;
                    height: 60px;
                }
                img:hover{
                    width: 80px;
                    height: 80px;
                }
            }
        }
        div:nth-child(2){
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            div:nth-child(2){
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-evenly;
            }
            div:nth-child(4){
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                height: 80px;
                gap: 100px;
                button{
                background-color: transparent;
                border: none;
                width: 80px;
                    img{
                        width: 60px;
                        height: 60px;
                    }
                    img:hover{
                        width: 80px;
                        height: 80px;
                    }
                }
            }
        }
`
export const AplicationTitle = styled.h1`
    font-size: 40px;
    color: #F319FE;
    span{
        color: #42DEE6;
    }
`
export const Paragrafo = styled.p`
    text-align: center;
    font-size: 30px;
`
export const NavContainer = styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            button{
                background-color: transparent;
                border: none;
                width: 80px;
                img{
                    width: 60px;
                    height: 60px;
                }
                img:hover{
                    width: 80px;
                    height: 80px;
                }
            }
`

