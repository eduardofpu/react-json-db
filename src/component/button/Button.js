import React, { Component } from 'react'

class Button extends Component {

     state = {
          loading: false
     }

     fetchData = () => {
          this.setState({loading:true});

          setTimeout(()=>{
               this.setState({loading:false});
          },2000);
     }
  
  
render() {
     const {loading} = this.state;
return (     
     
         <button 
         className="btn btn-outline-secondary" 
         onClick={this.fetchData} 
         type="submit" 
         value="Botão"
         disabled={this.props.desabilitar}
         onClickCapture={this.props.limpar}
         >

         {loading && <i className="fa fa-refresh fa-spin"></i>}
         {loading && <span>Limpando...</span>}
         {!loading && <span>{ this.props.nameButton }</span>}         
         </button>
        
   );
  }
}

export default Button;

