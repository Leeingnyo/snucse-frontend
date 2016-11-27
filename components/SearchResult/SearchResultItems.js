import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export const ArticleSearchResult = React.createClass({
  render() {
    const {profiles, id, title, content, writer, createdAt} = this.props.article;
    const primaryProfile = profiles[0];
    moment.locale('kr');
    const date = `${moment(createdAt.date, 'YYYYMMDD').format('YYYY-MM-DD')}`;
    return (
      <article className="search-item article-search-item">
        <Link to={`/${id}`}>{`${title}`}</Link> <time>{date}</time>
        <br/>
        <p>{content.substring(0, 200)} {content.length > 200 ? '...' : ''}</p>
        <Link to={`/${primaryProfile.id}`}>{primaryProfile.name}</Link> | <Link to={`/${writer.username}`}>{`${writer.name}`}</Link>
      </article>
    );
  }
});

export const CommentSearchResult = React.createClass({
  render() {
    // const {comment} = this.props;
    // const {title, writer, createdAt} = article;
    return (
      <article className="search-item comment-search-item">
        {JSON.stringify(this.props.comment)}<br/>
        <br/>
        댓글 내용 대충
      </article>
    );
  }
});

export const ProfileSearchResult = React.createClass({
  render() {
    const {profile} = this.props;
    const {name, description, id} = profile;
    return (
      <article className="search-item profile-search-item">
        <Link to={`/${id}`}>{name}</Link>
        <p>{description}</p>
      </article>
    );
  }
});

export const TagSearchResult = React.createClass({
  render() {
    const {tag} = this.props.tag;
    return (
      <article className="search-item tag-search-item">
        <Link to={`/tags/${tag}`}>{tag}</Link>
      </article>
    );
  }
});
