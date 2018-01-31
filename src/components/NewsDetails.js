import React, { Component } from "react";
import Modal from "react-responsive-modal";
import config from "../config/beta/config.beta.json";

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
    const { news, open } = this.state;
    return (
      <Modal open={open} onClose={this.onCloseModal} little>
        <img src={this.getThumbnail(news)} alt={news.document_type} />
        <h2>{news.snippet}</h2>
        <p>
          <small>{this.getPublishDate(news)}</small>
          <small> {news.source}</small>
        </p>
      </Modal>
    );
  }
}

export default NewsDetails;
