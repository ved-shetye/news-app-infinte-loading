import './App.css';
import React, {Component} from 'react'
import NavBar from './components/NavBar';
import NewsArea from './components/NewsArea';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render(){
    return (
      <div>
      <Router>
        <NavBar/> 
        <LoadingBar
          height={3}
          color='#f11444'
          progress={this.state.progress}
        />    
        <Routes>
          <Route exact path='/' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='general' key='general' />}/>
          <Route exact path='/business' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='business' key='business' />}/>
          <Route exact path='/entertainment' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='entertainment' key='entertainment' />}/>
          <Route exact path='/general' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='general' key='general' />}/>
          <Route exact path='/health' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='health' key='health' />}/>
          <Route exact path='/science' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='science' key='science' />}/>
          <Route exact path='/sports' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='sports' key='sports' />}/>
          <Route exact path='/technology' element={<NewsArea setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='technology' key='technology' />}/>
        </Routes>
      </Router>
      </div>
    );
  }
}
