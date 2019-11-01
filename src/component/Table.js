
import React from 'react'
import UserForm from '../page/user/form/UserForm';

import LoadingBlack from '../component/loading/LoadingBlack'

const Table = ({posts, loading, loadingEnter, setLoadingEnter, submitUserAction}) => {
   
    //Se o servidor estiver parado o loading sera carregado
    if(!loading){
       
            return <LoadingBlack type="spokes" color="black"></LoadingBlack>
    }else if(loadingEnter){
        setTimeout(()=>{
            setLoadingEnter(false);
    },1000);

        return <LoadingBlack type="spokes" color="black"></LoadingBlack>

    }
 
    
    return <ul className="list-group mb-4">

             <div> 
              
                <UserForm submitUserAction={submitUserAction}></UserForm><br></br><br></br>

              </div>

           
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
                       posts.map((item) =>{
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
      
    </ul>
};

export default Table;