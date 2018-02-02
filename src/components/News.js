import React, { Component } from "react";
import styled from "styled-components";
import NewsDetails from "./NewsDetails";
import config from "../config/beta/config.beta.json";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      open: false
    };
    this.getThumbnail = this.getThumbnail.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getPublishDate = this.getPublishDate.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }

  getThumbnail(news) {
    const newsWithMedia = news.multimedia.filter(media => {
      return media.subtype === "thumbnail";
    });
    if (newsWithMedia.length && newsWithMedia[0].url) {
      const url = `${config.assetServer}/${newsWithMedia[0].url}?api-key=${
        config.apiKey
      }`;
      return url;
    }
  }
  getPublishDate(news) {
    const dateTimeStamp = news.pub_date && new Date(news.pub_date);
    return dateTimeStamp && dateTimeStamp.toLocaleString();
  }

  render() {
    const { news, open } = this.state;
    const Wrapper = styled.li`
      padding: 4em;
      background: red;
    `;
    return (
      <li onClick={this.openModal}>
        <h1>{news.snippet}</h1>
        <img src={this.getThumbnail(news)} alt={news.document_type} />
        <p>
          <small>{this.getPublishDate(news)}</small>
          <small> {news.source}</small>
        </p>
        <NewsDetails open={open} news={news} />
      </li>
    );
  }
}
export default News;
