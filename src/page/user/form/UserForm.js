import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import React from 'react'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '../../../component/button/Button';

//Métodos de validação    
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

//Component input
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
    <label>{label}</label>
    <div className="form-group">
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span><font color="red">{ error }</font></span>) || (warning && <span><font color="red">{ warning }</font></span>))}
    </div>
    </div>
)    

  
const{handleSubmit, pristine, reset, submitting, submitUserAction } = props
  
   
const submit = (data) =>{

  //Utiliza a importação confirmAlert do react-confirm-alert.css
  confirmAlert({
    title: 'Salvar contato',
    message: 'Você deseja salvar?',
    buttons: [
   {
    label: 'OK',
    onClick: () => submitUserAction(data)   
                
   },
   {
    label: 'Cancel'
   }
  ]
 });
 
}


    return (
      
      <div>
        
         <form  onSubmit={handleSubmit((fields)=>submit(fields))}>
            
         <div className="form-group">
                <Field             
                type="text"                
                name="nome" 
                component={renderField}
                label="Nome"             
                validate={[ required, maxLength10 ]}
                warn={minLength}              
                />
          </div>  
          <div className="form-group"> 
                
                <Field 
                type="email"                
                name="email" 
                component={renderField}
                label="Email"             
                validate={[required, email]}
                warn={aol}              
                />
            </div>   

             <button disabled={submitting} type="submit" className="btn btn-primary">Salvar</button>
             {/* <button type="button" className="btn btn-outline-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>  */}

             <Button nameButton="Clear Values" desabilitar={pristine || submitting} limpar={reset}></Button>     
                    
         </form>
        
       </div>
    );
}

const UserForm = (reduxForm({
    form: 'form-user'
}))(UserFormFunc)

const mapStateToProps = state =>({
  
})

export default connect(mapStateToProps)(UserForm)

