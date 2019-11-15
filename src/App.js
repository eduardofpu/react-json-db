import React,{ Component } from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
import routesConfig from './routesConfig';
import imgReact from'./imgs/react.png'
import imgNode from'./imgs/nodejs.png'

class App extends Component {  

  
  render() {
    return (
    <div> 
              

        <div className="App">
        <div className="img-node"> <img src={imgNode} alt="imgNode"/></div><div></div>
              <Link to="/">Home</Link> 
              <Link to="/infinitSimple">Scroll</Link>
              <Link to="/botao">Botao</Link>
              <Link to="/infinitJson">ScrollJson</Link>
              <Link to="/infinitContato">ScrollContato</Link>
              <Link to="/linha">Linha</Link>
              <Link to="/table">save</Link> 
              <Link to="/crudTable">update</Link> 
              <Link to="/user">submit</Link> 
              <Link to="/userEdit">Edit</Link>               
              <Link to="/reduxForm">Redux</Link> 
              {/* <Link to="/mycomp">loading</Link>        */}
              <Link to="/form">State</Link><div></div>
             
              <div className="img-react"> <i><img src={imgReact} alt="imgReact"/>  </i></div>  
                             
        </div>
        {routesConfig.map((value,key)=>{
          return <Route 
            key={key} 
            path={value.path} 
            component={value.component} 
            exact={value.exact}></Route>
        })}
     </div>    
    );
 
  }
}

export default App;
