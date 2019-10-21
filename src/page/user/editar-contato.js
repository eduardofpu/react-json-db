import React, { Component } from 'react'
import {deleteActionId } from '../../actions/user/UserAction';
import FormEdit from './form/FormEdit';
import './contato.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

class UserEdit extends Component {
  
constructor(){
    super()    
    this.state = { lista:[], data: '' };  
 
}    

buscarContato(){   
        
    let url = "http://localhost:3001/users"
    fetch(url,{
        method:"GET",
        headers:{
            'Content-type':'application/json'
        }
    }).then((response) => response.json())
    .then(json => {
        this.setState({ 
            lista: json
            })        
           
        })
}  


deleteContato(codigo, event) {
    event.preventDefault();
    var txt;
    var r = confirm("Deseja Excluir?");
    if (r === true) {
        txt = "OK!";
        deleteActionId(codigo)       
        alert ('Excluido com sucesso!!')       
        
    } else {
        txt = "Cancel!";
    }
    //this.buscarContato();
}

getDadosParaEditar(json,event){    
    event.preventDefault();
   
    let dados = json;
    
    
    
    this.setState({ 
        data: dados
        })       
     
    console.log("data",dados )    
    
}

mostrarFormEdit() {
    
    if (this.state.data.id != null) {
        return <FormEdit
                        id={this.state.data.id}
                        nome={this.state.data.nome}
                        email={this.state.data.email}
                        atualizarTabelaContato = { this.buscarContato() }>
               </FormEdit>;
    }
    return  this.buscarContato();
}


componentDidMount() {  
     this.buscarContato();
 }

render() {
    
    const list = this.state.lista;    
   
        
return (       
    
    <div  className="contato">
       
         {this.mostrarFormEdit()}
        <br></br><br></br>
                
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
                        list.map((item) =>{
                        return (

                                <tr key={item.id}> 
                                        
                                    <td scope="row"> {item.id} </td>  
                                    <td> {item.nome} </td>
                                    <td> {item.email} </td>
                                    <td><button className="btn btn-warning" onClick={this.getDadosParaEditar.bind(this,item)}><i className="fa fa-pencil"></i></button></td>
                                    <td><button className="btn btn-danger ml-2" onClick={this.deleteContato.bind(this,item.id)}> <i className="fa fa-trash"></i>  </button></td> 
                                    
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
