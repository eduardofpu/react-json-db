import React, {Component} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import axios from 'axios'

const baseUrl = 'http://localhost:3001/users' 

 

const style = {
    height: 100,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

class ScrollJson extends Component {

    constructor(){
        super()
        this.state = {
            lista:[],
            pageNumber:0,
            porPagina:15,
            hasMore: true
      }
  }

fetchData = () => {

    axios.get(baseUrl+`?page=${this.state.pageNumber}`)
    .then(res =>
        
            this.setState({  
                lista: [...this.state.lista, ...res.data],
                pageNumber: this.state.pageNumber + 1 
                
            })    
    );            
  };
componentWillMount(){
    this.fetchData();     
}


  render() {

        
    const list = this.state.lista;   
    
        
    const ultimoIndex = this.state.pageNumber * this.state.porPagina;
    const primeiroIndex = ultimoIndex - this.state.porPagina;
    const contatosAtuais = list.slice(primeiroIndex, ultimoIndex);  

    return (
      <div>
        <h4>demo: react-infinite-scroll-component com json.db</h4>
        <hr />
        <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
        >

          {contatosAtuais.map(item => (
            <div style={style} key={item.id}>
                   {item.id} - {item.nome}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default ScrollJson;