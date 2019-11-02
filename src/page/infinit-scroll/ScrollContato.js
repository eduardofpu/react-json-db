import React, {Component} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingScroll from '../../component/loading/LoadingScroll';
import apiContato from '../apiContato';


//Utilizando a api contato
const baseUrl = '/buscarcontato' 

const style = {
    height: 100,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

class ScrollContato extends Component {

    constructor(){
        super()
        this.state = {
            lista:[],
            pageNumber:0,
            hasMore: true
     }
 }


fetchData = () => {

  apiContato.get(baseUrl+`?page=${this.state.pageNumber}`)
    .then(res =>

      setTimeout(() => {
        this.setState({
            //updating data
        lista: [...this.state.lista, ...res.data],
        //updating page numbers
        pageNumber: this.state.pageNumber + 1

        });
        
      }, 3000) 
                  
    );            
 };
    
loading(){
  if(this.state.lista!=null){
    return <h4> <LoadingScroll type="bubbles" color="black"></LoadingScroll>  </h4>
  }
}

componentWillMount(){
    this.fetchData();
     
}

  render() {

        
    const list = this.state.lista;   
    
    return (
      <div>
        <h4>demo: react-infinite-scroll-component com api-contato</h4>
        <hr />
        <InfiniteScroll
          dataLength={this.state.lista.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={  this.loading() }
        >

          {list.map(item => (
            <div style={style} key={item.id}>
                   {item.id} - {item.nome}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default ScrollContato;