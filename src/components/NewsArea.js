import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class NewsArea extends Component {
    static defaultProps = {
      country: 'in',
      category: "general"
    }
    static propTypes = {
      country: PropTypes.string,
      category: PropTypes.string
    }
    
    constructor(){
      super();
      this.state = {
        articles: [],
        loading: false,
        pageSize: 9,
        page: 1,
        totalResults: 0
        }
      }

      async updatePage(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
          articles: parseData.articles, 
          totalResults: parseData.totalResults,
          loading: false,
          page: this.state.page})
        this.props.setProgress(100);  
      }

      async componentDidMount(){
        this.updatePage();
      }
      // handlePreviousChange = async()=>{
      //   this.setState({page: this.state.page-1});
      //   this.updatePage();
      // }
      // handleNextChange = async()=>{
      //   this.setState({page: this.state.page+1});
      //   this.updatePage();
      // }
      fetchMoreData = async() => {

        this.setState({page: this.state.page + 1});
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parseData.articles), 
          totalResults: parseData.totalResults,
          page: this.state.page})
      }
    
  render() {
    return (

      <div className='container my-3'>

        <div className="container my-4 py-4">
          <h1 className='text-center'>News Hunt</h1>
          <h5 className='text-center'> Your very own new site for quick and reliable updates</h5>
        </div>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,75):""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt}/></div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
