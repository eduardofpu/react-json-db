
import React, {useState} from 'react'

import FormEdit from '../page/user/form/FormEdit'

import axios from 'axios'



const baseUrl = 'http://localhost:3001/users' 


const CrudTable = ({posts, loading, setPosts, lista}) => {    
    const [dados, setDados] = useState([]);
    const [novaLista, setLista] = useState([]);
                 
    if(loading){
      return <h2>Loading...</h2>
    }



const getDadosParaEditar = (data) => {      
    setDados(data);   
}

const salvar = (data) =>{  

    let id = dados.id
    console.log("Id: ",id)
    axios.put(`${baseUrl}/${id}`, data)
    .then(resp => {
        const list = getUpdateList(resp.data)    
        setPosts(list)
    })
}
 

const deleteContato = (data) => {
        
    var txt;
    var r = confirm("Deseja Excluir?");
    if (r === true) {
        txt = "OK!";
        // setLista(data)
        remove(data)     
        alert ('Excluido com sucesso!!')       
        
    } else {
        txt = "Cancel!";
    }  
}

const remove = (data) => {

    axios.delete(`${baseUrl}/${data.id}`).then(resp => {
        console.log("No content 204",resp.data)
       
        const list = getUpdateList(data, false)        
        setPosts(list);
        console.log("Nova lista: ",list)        
    })
  }
 
  
const getUpdateList = (user, add = true) => {
    //Remove o usuario da lista  e coloca o novo usuario na primeira posição
    const list = lista.filter(u=> u.id !== user.id)

    // coloca o primeiro elemento no array   
    if(add) list.unshift(user)
      return list
}

const mostrarFormEdit = (lista) => {

    const save = data => salvar(data);  
 
    
    if (lista.id != null) {
        return <FormEdit
                        id={lista.id}
                        nome={lista.nome}
                        email={lista.email}
                        updateAction ={save}                         
                        >
               </FormEdit>; 
    }
      
}
   
    return <ul className="list-group mb-4">
            
             <div>             
              
                { mostrarFormEdit(dados) }

              </div>

           
           <table className="table table-striped">
           <thead >
               <tr> 
               <th scope="col">id</th>         
               <th scope="col">nome</th>
               <th scope="col">email</th>
               <th scope="col">Alterar</th>
               <th scope="col">Excluir</th>
               </tr >
               </thead>
               <tbody>

                   {                       
                      
                       posts.map((item) =>{
                       return (
                               <tr key={item.id}> 
                                   
                                   <td scope="row"> {item.id} </td>  
                                   <td> {item.nome} </td>
                                   <td> {item.email} </td> 
                                   <td><button className="btn btn-warning" onClick={() => getDadosParaEditar(item)}><i className="fa fa-pencil"></i></button></td>
                                   <td><button className="btn btn-danger ml-2" onClick={() => deleteContato(item)}> <i className="fa fa-trash"></i></button></td>                                   
                                   
                               </tr>
                               );                            
                           })   
                   }

               </tbody>
       </table>
       
      
    </ul>
};

export default CrudTable;