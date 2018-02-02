import React, { Component } from "react";
import News from "./News";
import config from "../config/beta/config.beta.json";
import styled from "styled-components";

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
    const NewsList = styled.div`
      float: left;
      width: 100%;
      list-style-type: none;
      padding: 0px;
      margin: 0px 0px 20px 0;
    `;
    const ShowMoreButton = styled.button`
      width: 50%;
      display: block;
      background: #1e88e5;
      cursor: pointer;
      padding: 5px 10px;
      margin: 20px auto 20px auto;
      border: 0;
      color: #fff;
      font-size: 1.5rem;
      box-shadow: none;
      &: hover {
        background: #005cb2;
      }
    `;
    return (
      <div>
        {this.state.newsList.length > 0 && (
          <NewsList>{this.getNewList()}</NewsList>
        )}
        {this.state.newsList.length > 0 && (
          <ShowMoreButton onClick={this.showMore}>Show more</ShowMoreButton>
        )}
      </div>
    );
  }
}

export default NewsList;
