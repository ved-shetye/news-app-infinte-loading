import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!imgUrl?"https://www.colourbox.com/preview/18487902-news-in-lead-letters.jpg":imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">On {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read more... </a>
          </div>
        </div>
      </div>
    )
  }
}
