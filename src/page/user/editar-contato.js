import React, { Component } from 'react'
import FormEdit from './form/FormEdit';
import './contato.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import Pagination from '../../component/Pagination';



import LoadingBlack from '../../component/loading/LoadingBlack'
import State from '../../component/msg/State';


const baseUrl = 'http://localhost:3001/users' 

class UserEdit extends Component {
    
constructor(){
    super()    
    this.state = { 
         loading:false,
         loadingEnter:false,
         lista:[],
         data: '' ,
         paginaAtual:[1],         
         porPagina:[4]         
        };       
}   

getTable(){
 
    axios(baseUrl).then(resp => {
        this.setState({ 
            loading:true,
            loadingEnter:true,
            lista: resp.data
         })
    })   
}

componentWillMount(){
    this.getTable()
}

deleteContato(user, event) {
    event.preventDefault();

    var txt;
    var r = confirm("Deseja Excluir?");
    if (r === true) {
        txt = "OK!";
        // deleteActionId(codigo)  
        this.remove(user)     
        // alert ('Excluido com sucesso!!')       
        
    } else {
        txt = "Cancel!";
    }  
}

remove(user){
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        const list = this.getUpdateList(user, false)        
        this.setState({lista: list })
        console.log("Nova lista: ",list)
    })
}


getUpdateList(user, add = true){
    //Remove o usuario da lista  e coloca o novo usuario na primeira posição
    const list = this.state.lista.filter(u=> u.id !== user.id)
    // coloca o primeiro elemento no array
    if(add) list.unshift(user)
      return list
}

getDadosParaEditar(user,event){    
    event.preventDefault();
   
    let dados = user;
    
    this.setState({ 
        data: dados
        })       
     
    console.log("data",dados ) 
}

salvar(data) {  
     let id = this.state.data.id
     axios.put(`${baseUrl}/${id}`, data)
    .then(resp => {
      const list = this.getUpdateList(resp.data)
      this.setState({lista:list})
    })
 }

mostrarFormEdit() {

    const save = data => this.salvar(data);
    
    if (this.state.data.id != null) {
        return <FormEdit
                        id={this.state.data.id}
                        nome={this.state.data.nome}
                        email={this.state.data.email}
                        updateAction ={save}
                       
                        >
               </FormEdit>; 
    }      
}

pagina(pageNumber) {  
   this.setState({
    paginaAtual: pageNumber
   })
    console.log("Page: ",pageNumber)
}

carregandoPagina(){
    
}

render() {
    
    const list = this.state.lista;  
    
    const ultimoIndex = this.state.paginaAtual * this.state.porPagina;
    const primeiroIndex = ultimoIndex - this.state.porPagina;
    const contatosAtuais = list.slice(primeiroIndex, ultimoIndex);
    

    //Get page
    const paginate = pageNumber => this.pagina(pageNumber);

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
    
    <div  className="contato">
        <h5 className="text-primary mb-3"><State name="Clique aqui para saber mais..."></State></h5>    
       
         {this.mostrarFormEdit()}
                <br></br><br></br>

        <Pagination 
        postsPerPage={this.state.porPagina} 
        totalPosts={list.length} 
        paginate={ paginate }
        />
                
        <table className="table table-striped">
            <thead>
                <tr> 
                <th scope="col">id</th>         
                <th scope="col">nome</th>
                <th scope="col">email</th>
                <th scope="col">Alterar</th>
                <th scope="col">Excluir</th>
                </tr>
                </thead>
                <tbody>                    

                    {
                        contatosAtuais.map((item) =>{
                        return (

                                <tr key={item.id}> 
                                        
                                    <td scope="row"> {item.id} </td>  
                                    <td> {item.nome} </td>
                                    <td> {item.email} </td>
                                    <td><button className="btn btn-warning" onClick={this.getDadosParaEditar.bind(this,item)}><i className="fa fa-pencil"></i></button></td>
                                    <td><button className="btn btn-danger ml-2" onClick={this.deleteContato.bind(this,item)}> <i className="fa fa-trash"></i>  </button></td> 
                                    
                                </tr>
                                );                            
                           })   
                    }

                </tbody>
        </table>        
    </div>

);
       
}

}

export default UserEdit;
