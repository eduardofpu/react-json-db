    import React from 'react'        
    import { Field, reduxForm } from 'redux-form'
    import '../user/contato.css'
    import 'bootstrap/dist/css/bootstrap.min.css'

    //DOC:   https://redux-form.com/6.6.1/examples/fieldlevelvalidation/  
    
    
    const renderField = ({input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span><font color="red">{error}</font></span>)|| (warning && <span><font>{warning}</font></span>))}
    </div>     
    );

    const onSubmit = values => {
        alert(JSON.stringify(values))
    }
    const required = v =>{
        if(!v || v=== ''){
            return 'This fields is required'
        }
        return undefined;
    }

    const allowedName = v =>{
        if(v=== 'teste'){
            return '"teste" is not a valid customer id';
        }
        return undefined;
    }

    const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined

    const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

    const maxLength15 = maxLength(3)


    const ReduxForm = ({handleSubmit,valid}) => (
        <div className="contato">
             <h3 className="text-primary mb-3">Validação com Redux</h3>    
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Field name="cutomer-id"  
                component={renderField} 
                label="Username" 
                validate={[required,allowedName,maxLength15]}
                warn={tooOld}
                 />  
                 </div>              
                <button disabled={!valid} type="submit" className="btn btn-primary">Submit</button>
            </form>
            
            
        </div>

    );

    export default reduxForm({
        form: 'my-customer-registration-form',
        onSubmit,
    }) (ReduxForm);