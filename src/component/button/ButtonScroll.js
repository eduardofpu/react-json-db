import React, { Component } from 'react'

class ButtonScroll extends Component {

     state = {
          loading: false
     }

     fetchData = () => {
          this.setState({loading:true});

          setTimeout(()=>{
               this.setState({loading:false});
          },1000);
     }
  
  
render() {
     const {loading} = this.state;
return (     
     
         <button 
         className="btn btn-outline-secondary" 
         onClick={this.fetchData} 
         type="submit" 
         value="Botão"        
         onClickCapture={this.props.proximo}
         >

         {loading && <i className="fa fa-refresh fa-spin"></i>}
         {loading && <span>   Buscando...</span>}
         {!loading && <span>{ this.props.nameButton }</span>}         
         </button>        
   );
  }
}

export default ButtonScroll;

