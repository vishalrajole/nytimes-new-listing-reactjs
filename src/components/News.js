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
    const Title = styled.h1`
      font-size: 1.5rem;
      font-weight: 300;
      color: #333;
      margin: 5px 0 10px 0;
    `;
    const News = styled.div`
      width: 100%;
      min-height: 120px;
      float: left;
      position: relative;
      cursor: pointer;
      padding: 10px 20px 10px 150px;
      box-sizing: border-box;
      & + div {
        border-top: 1px solid #ddd;
      }
      &: hover {
        background: #eee;
      }
    `;
    const PublishInfo = styled.p`
      margin: 10px 0 0 0;
    `;
    const NewsThumbnailWrapper = styled.div`
      position: absolute;
      box-sizing: border-box;
      width: 150px;
      height: 100%;
      top: 0;
      left: 0;
      padding: 20px;
      text-align: center;
    `;
    const PublishDate = styled.small`
      float: right;
      color: #666;
    `;
    const Source = styled.small`
      color: #005cb2;
      font-size: 1rem;
    `;
    const NewsThumbnail = styled.img`
      max-width: 100%;
    `;
    const { news, open } = this.state;
    return (
      <React.Fragment>
        <News onClick={this.openModal}>
          <NewsThumbnailWrapper>
            <NewsThumbnail
              src={this.getThumbnail(news)}
              alt={news.document_type}
            />
          </NewsThumbnailWrapper>
          <Title>{news.snippet}</Title>
          <PublishInfo>
            <Source> {news.source}</Source>
            <PublishDate>{this.getPublishDate(news)}</PublishDate>
          </PublishInfo>
        </News>
        <NewsDetails open={open} news={news} />
      </React.Fragment>
    );
  }
}
export default News;
