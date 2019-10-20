import React, { Component } from 'react'
import UserForm from './form/UserForm';
import './contato.css'
import 'bootstrap/dist/css/bootstrap.min.css'



class User extends Component {
    
constructor(){
    super()

    this.state = { 
        lista:[]
         
    }; 
      
}    

buscarContato(){   
        
    let url = "http://localhost:3001/users"
    fetch(url,{
        method:"GET",
        headers:{
            'Content-type':'application/json'
        }
    }).then((response) => response.json())
    .then(dados => {
        this.setState({ 
            lista: dados
            })        
            
        })
}  
 
render() {
    
   
    const list = this.state.lista;    
   

return (       
    
    <div className="contato">
        <div>        
        <UserForm atualizarTabelaContato = { this.buscarContato() }></UserForm><br></br><br></br>
        </div>
      <div>  
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
                        list.map((item) =>{
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
