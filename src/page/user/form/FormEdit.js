import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const required = value => value ? undefined : '*'

const maxLength = max => value =>
    value && value.length > max ? `Deve ter ${max} ou menos caracteres` : undefined
const maxLength10 = maxLength(10)

const minLength = value =>
    value && value.length < 3 ? `O valor minimo e 3 caracteres!` : undefined


const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Endereço de email invalido' : undefined

const aol = value =>
    value && /.+@hotmail\.com/.test(value) ?
    'Realmente? Você ainda usa a HOTMAIL para seu email?' : undefined

const UserFormFunc = props => {

    
var id = props.id
   
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
  <label>{label}</label>
  <div>
      <input {...input} placeholder={label} type={type} className="form-control" disabled={!verifyId()}/>
      {touched && ((error && <span><font color="red">{error}</font></span>) || (warning && <span><font color="red">{warning}</font></span>))}
  </div>
  </div>
)  
const verifyId = () =>{
  
  if(id!=null){
    return true;
  }

}
    
const{handleSubmit, pristine, reset, submitting,updateAction } = props

    const submit = (data) =>{
            
      if(!verifyId()){
      
        confirmAlert({
          title: 'Atenção!!! clique no botão Editar',
          message: 'Veja a lista de contato na tabela abaixo',
          buttons: [
            
            {
              label: 'Ok entendi'
            }
          ]
        });   
      

      } else {

        confirmAlert({
          title: 'Editar contato',
          message: 'Você deseja salvar as alterações?',
          buttons: [
            {
              label: 'OK',
               //o data e o payload  nome e email
              onClick: () => updateAction(data) 
                                 
            },
            {
              label: 'Cancel'
            }
          ]          
        });
      }    
     
    }


    // o props captura no id, nome e o email passdo atraves de um estado no userEdit
    return (       
        
        <div>    
            <form onSubmit={handleSubmit((fields)=>submit(fields))}>
             
                <label>                  
                id:{id}
                </label><p></p> 
                <Field 
                type="hidden" 
                name="id"
                component="input"
                required                
                // label={["id:",id]}
                
                />
             
             <div className="form-group">
                <label> <p></p>
                Name: 
                </label>
                <Field 
                type="text" 
                name="nome" 
                component={renderField}
                validate={[required, maxLength10]}
                warn={minLength}
                label={props.nome}                
                />
               </div> 

               <div className="form-group">

                <label><p></p>
                Email:
                </label>
                <Field 
                type="text" 
                name="email" 
                component={renderField}  
                label={props.email}            
                validate={[required, email]}
                warn={aol}                              
                />
                </div>
                              
                <button disabled={pristine || submitting} type="submit"  className="btn btn-primary">Salvar</button>
                <button type="button"  className="btn btn-outline-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>   
              
            </form>
        </div>
    );  
  }
const FormEdit = (reduxForm({
form: 'myFormName'
}))(UserFormFunc)

const mapStateToProps = state =>({
    
})

export default  connect(mapStateToProps)(FormEdit)       
