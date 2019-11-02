import React, {Component} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingScroll from '../../component/loading/LoadingScroll';
import apiDb from '../apiDb';

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
            pageNumber:1,
            porPagina:15,
            hasMore: true
      }
      
  }

fetchData = () => {

   apiDb.get(`/users?_page=${this.state.pageNumber}&_limit=${this.state.porPagina}`)
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
    console.log(this.state.lista);          
  };

  
loading(){
  if(this.state.lista!=null){
   
    return <LoadingScroll type="bubbles" color="black"></LoadingScroll>
  }
}

componentWillMount(){
    this.fetchData();     
}


  render() {

        
    const list = this.state.lista;   
    
    return (
      <div>
        <h4>demo: react-infinite-scroll-component com json.db</h4>
        <hr />
        <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={this.loading()}
        >

          {list.map((item) => (
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