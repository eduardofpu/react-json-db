
import React, { Component } from 'react'
import UserForm from './form/UserForm';
import './contato.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from '../../component/Pagination';


import LoadingBlack from '../../component/loading/LoadingBlack'
import State from '../../component/msg/State';
import apiDb from '../apiDb';


const baseUrl = '/users'


class User extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading:false,
            loadingEnter:false,
            lista:[],
            paginaAtual:[1],
            porPagina:[4]
        };

    }

    getListaTable(){

        apiDb.get(baseUrl).then(resp => {
            this.setState({
                loading:true,
                loadingEnter:true,
                lista: resp.data
            })
        })
    }

    componentWillMount(){

        this.getListaTable();

    }


    getUpdateList(user, add = true){
        //Remove o usuario da lista  e coloca o novo usuario na primeira posição
        const list = this.state.lista.filter(u=> u.id !== user.id)
        // coloca o primeiro elemento no array
        console.log("Nova lista: ",list)
        if(add) list.unshift(user)
        return list
    }

    salvar(data) {

        apiDb.post(baseUrl, data)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({lista:list})
            })
    }


    pagina(pageNumber) {
        this.setState({
            paginaAtual: pageNumber
        })
        console.log("Page: ",pageNumber)
    }

    render() {


        const list = this.state.lista;

        const ultimoIndex = this.state.paginaAtual * this.state.porPagina;
        const primeiroIndex = ultimoIndex - this.state.porPagina;
        const contatosAtuais = list.slice(primeiroIndex, ultimoIndex);

        //Get page
        const paginate = pageNumber => this.pagina(pageNumber);
        const save = data => this.salvar(data);

        let carregando = this.state.loading;
        let entrando = this.state.loadingEnter;

        //Se o servidor estiver parado o loading sera carregado
        if(!carregando){
            return <div>
                <br></br>
                <LoadingBlack type="spokes" color="black"></LoadingBlack>
            </div>

            //Se o servidor estiver ok o loading sera carregado durante alguns segundos e apresentara os dados
        }else if(entrando){
            setTimeout(()=>{
                this.setState({loadingEnter:false});
            },500);

            return <div>
                <br></br>
                <LoadingBlack type="spokes" color="black"></LoadingBlack>
            </div>
        }



        return (

            <div className="contato">
                <div>
                    <h5 className="text-primary mb-3"><State name="Clique aqui para saber mais..."></State></h5>
                    <UserForm  submitUserAction ={save} ></UserForm><br></br><br></br>
                </div>
                <div>

                    <Pagination
                        postsPerPage={this.state.porPagina}
                        totalPosts={list.length}
                        paginate={ paginate }
                    />

                    <table className="table table-striped">
                        <thead >
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">nome</th>
                            <th scope="col">email</th>
                        </tr >
                        </thead>
                        <tbody>

                        {
                            contatosAtuais.map((item) =>{
                                return (
                                    <tr key={item.id}>

                                        <td scope="row"> {item.id} </td>
                                        <td> {item.nome} </td>
                                        <td> {item.email} </td>

                                    </tr>
                                );
                            })
                        }

                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default User;
