import React, { Component } from "react";
import News from "./News";
import config from "../config/beta/config.beta.json";

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      pageCount: 0
    };
    this.getNews = this.getNews.bind(this);
    this.getNewList = this.getNewList.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }
  getNews() {
    return fetch(
      `${config.apiServer}/svc/search/v2/articlesearch.json?api-key=${
        config.apiKey
      }&page=${
        this.state.pageCount
      }&fl=source,multimedia,pub_date,_id,snippet,keywords&sort=newest`
    )
      .then(response => response.json())
      .catch(error => console.log("inside error: ", error))
      .then(response =>
        this.setState(prevState => {
          let oldNews = prevState.newsList;
          if (oldNews) {
            oldNews = oldNews.concat(response.response.docs);
          }
          return { newsList: oldNews };
        })
      );
  }

  showMore() {
    this.setState({ pageCount: ++this.state.pageCount }, function() {
      this.getNews();
    });
  }
  getNewList() {
    return this.state.newsList.map(news => <News key={news._id} news={news} />);
  }
  render() {
    return (
      <div>
        {this.state.newsList.length > 0 && <ul>{this.getNewList()}</ul>}
        {this.state.newsList.length > 0 && (
          <button onClick={this.showMore}>Show more</button>
        )}
      </div>
    );
  }
}

export default NewsList;
