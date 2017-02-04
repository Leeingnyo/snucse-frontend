import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import Realtime from '../Realtime';
import {Url, DataCon} from '../../utils';
import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';
import Survey from '../Survey';

import '../../stylesheets/article.styl';

const ArticleItem = React.createClass({
  handleArticleDelete(articleId, surveyId) {
    const url = Url.getUrl(`/articles/${articleId}`);
    if (surveyId) {
      const surveyUrl = Url.getUrl(`/surveys/${surveyId}`);
      DataCon.postDataToServer(surveyUrl, 'DELETE')
        .then(() => {
          DataCon.postDataToServer(url, 'DELETE');
        }).catch(console.error);
    } else {
      DataCon.postDataToServer(url, 'DELETE')
        .then(() => {
          browserHistory.goBack();
        }).catch(console.error);
    }
  },

  render() {
    moment.locale('ko');
    const {article} = this.props;

    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    const survey = article.surveyId ? <Survey surveyId={article.surveyId}/> : null;
    return (
      <div className="feed-article">
        <small className="article-date" title={date.format('LLL')}>
          <Realtime from={date}/>
        </small>
        <h5 className="article-title">{article.title}<Link to={`/${article.profiles[0].id}`} className="article-profiles">{article.profiles[0].name}</Link></h5>
        <div className="article-main">
          <div className="article-writer-container">
            <img className="article-writer-image" src={article.writer.profileImageUri}/>
            <h5 className="article-writer-name">{article.writer.name}</h5>
          </div>
          <div className="article-divider"/>
          <div className="article-content-container">
            <FileBox files={article.files}/>
            <DelEditBox mine={mine} articleId={article.id} surveyId={article.surveyId} onArticleDelete={this.handleArticleDelete}/>
            {survey}
            <div className="article-content" dangerouslySetInnerHTML={{__html: article.renderedContent}}/>
          </div>
        </div>
        <ArticleRecommendBox articleId={article.id} count={article.recommendationCount}/>
        <ArticleTagBox articleId={article.id}/>
        <ArticleCommentBox
          articleId={article.id}
          lastComment={article.lastComment}
          commentCount={article.commentCount}
          isAddable
          />
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(ArticleItem);
