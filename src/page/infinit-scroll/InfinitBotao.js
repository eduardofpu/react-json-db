import React, {Component} from 'react'
import axios from 'axios'
import LoadingScroll from '../../component/loading/LoadingScroll';
import ButtonScroll from '../../component/button/ButtonScroll';

const style = {
    height: 100,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

class InfinitBotao extends Component {

    constructor(){
        super()
        this.state = {
            breweries: [],
            pageNumber: 1,
            items: 1,
            hasMore: true
      }
  }


fetchData = () => {
  axios
  .get(
      `https://api.openbrewerydb.org/breweries?page=${
        this.state.pageNumber
      }&per_page=${this.state.items}`
    )
    .then(res =>
      setTimeout(() => {
        this.setState({
           //updating data
        breweries: [...this.state.breweries, ...res.data],
        //updating page numbers
        pageNumber: this.state.pageNumber + 1

        });
        // console.log(this.state.breweries);
      }, 1000)  
      
    );
    
};

componentWillMount(){
    this.fetchData();   
}

  render() {


    return (
      <div>
        <h4>demo: react-infinite-scroll-component com api-breweries</h4>
        <hr />
        
          {this.state.breweries.map(item => (
            <div style={style} key={item.id}>
                   {item.id} - {item.name}
            </div>
          ))}
          <hr></hr>
                <center>         
                {/* <button className="btn btn-outline-secondary"  onClick={this.fetchData}>ABRIR</button> */}
                <ButtonScroll nameButton="Próxima linha" proximo={this.fetchData}></ButtonScroll>                
                </center>  
                <hr></hr>        
                    
                </div>
    );
  }
}
export default InfinitBotao;
