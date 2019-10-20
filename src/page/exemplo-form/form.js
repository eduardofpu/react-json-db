import React, { Component } from 'react'
import '../user/contato.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors,...rest}) => {   
    console.log("val",rest);
     let valid = true;
     Object.values(formErrors).forEach(val => {
       val.length > 0 && (valid === false)
       
      });

      Object.values(rest).forEach(val =>{
          val === null && (valid === false)

      });
   
      return valid;
   };

class Form extends Component {
     
constructor(){
    super()

    this.state = {         
        nome: null,
        email: null,
        formErrors: {
            nome: "",
            email: ""
          }    
    }; 
    this.handleChange = this.handleChange.bind(this);   
    
}    
 
 submeter = (e) =>{
    e.preventDefault(); 
    
    if(formValid(this.state)){
      console.log(`
      --SUBSTRING--
      Name: ${this.state.nome}
      Email: ${this.state.email}
      `)
    }else{
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }

 
 }

 handleChange = event => {
 event.preventDefault();
 const { name,value } = event.target;
 let formErrors = this.state.formErrors;

 switch (name){
   case "nome":
     formErrors.nome = value.length < 3 ? "  minimum 3 characaters required"
       : "";
     break;

   case "email":
       formErrors.email = emailRegex.test(value) 
       ? ""
         : "  invalid email address";
       break;
     default:
       break;    
 }
 
 this.setState({ formErrors, [name]:value }, () => console.log(this.state));
       
}
  
render() {
    
    const { formErrors } = this.state;
        
return (       
    
    <div className="contato">
       
        <form onSubmit={this.submeter}>
        <div className="form-group">
             <label> 
                 Name
             </label><p></p>

             <input 
             className= {formErrors.nome.length > 0 ? "error" : null} 
             type="text" 
             className="form-control"
             name="nome" 
             placeholder="nome" 
             onChange={this.handleChange}
             />
            {formErrors.nome.length > 0 && (<span>{formErrors.nome}</span>)}
            </div>
            <div className="form-group">      
             <label><p></p>
                 Email
             </label><p></p>

             <input 
             className= {formErrors.email.length > 0 ? "error" : null}
             type="email"
             className="form-control"
             name="email"
             placeholder="email"
             onChange={this.handleChange}
             />
             {formErrors.email.length > 0 && (<span>{formErrors.email}</span>)}<p></p>

             </div>
            
             <button   type="submit" className="btn btn-primary" >Salvar</button> 
             <small>Already have an Account?</small>
                          
         </form>
       
    </div>     
);
}
}

export default Form;
