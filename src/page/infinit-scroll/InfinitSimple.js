import React, {Component} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import axios from 'axios'
import LoadingScroll from '../../component/loading/LoadingScroll';

const style = {
    height: 100,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

class InfinitSimple extends Component {

    constructor(){
        super()
        this.state = {
            breweries: [],
            pageNumber: 1,
            items: 15,
            hasMore: true
      }
  }


fetchData = () => {
  axios
  .get(`https://api.openbrewerydb.org/breweries?page=${
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
      }, 3000)
      
    );
};


loading(){
  if(this.state.breweries!=null){
    return <h4> <LoadingScroll type="bubbles" color="black"></LoadingScroll>  </h4>
  }
}

componentWillMount(){
    this.fetchData();
}

  render() {


    return (
      <div>
        <h4>demo: react-infinite-scroll-component com api-breweries</h4>
        <hr />
        <InfiniteScroll
          dataLength={this.state.breweries.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={this.loading()}
        >

          {this.state.breweries.map(item => (
            <div style={style} key={item.id}>
                   {item.id} - {item.name}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default InfinitSimple;