import React, { Component } from "react";
import Modal from "react-responsive-modal";
import config from "../config/beta/config.beta.json";
import styled from "styled-components";

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      news: this.props.news
    };
    this.onCloseModal = this.onCloseModal.bind(this);
    this.getPublishDate = this.getPublishDate.bind(this);
  }
  componentWillReceiveProps({ open }) {
    this.setState({ open });
  }
  onCloseModal(news) {
    this.setState({ open: false });
  }
  getPublishDate(news) {
    const dateTimeStamp = news.pub_date && new Date(news.pub_date);
    return dateTimeStamp && dateTimeStamp.toLocaleString();
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
  render() {
    const Title = styled.h1`
      font-size: 1.5rem;
      font-weight: 300;
      color: #333;
      margin: 30px 0 10px 0;
      text-align: center;
    `;
    const PublishInfo = styled.p`
      float: right;
      margin: 10px 0 0 0;
    `;
    const PublishDate = styled.small`
      float: left;
      margin-left: 20px;
      margin-top: 2px;
      color: #666;
    `;
    const Source = styled.small`
      float: left;
      color: #005cb2;
      font-size: 1rem;
    `;
    const NewsImage = styled.img`
      max-width: 100%;
    `;
    const NewsImageWrapper = styled.div`
      float: left;
      width: 100%;
      margin: 20px auto;
      text-align: center;
    `;
    const { news, open } = this.state;
    return (
      <Modal open={open} onClose={this.onCloseModal} little>
        <Title>{news.snippet}</Title>
        <PublishInfo>
          <Source> {news.source}</Source>
          <PublishDate>{this.getPublishDate(news)}</PublishDate>
        </PublishInfo>
        <NewsImageWrapper>
          <NewsImage src={this.getThumbnail(news)} alt={news.document_type} />
        </NewsImageWrapper>
      </Modal>
    );
  }
}

export default NewsDetails;
