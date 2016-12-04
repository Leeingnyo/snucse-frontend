import React from 'react';
import {connect} from 'react-redux';

import {loadArticle} from '../actions/dispatchers';

const Article = React.createClass({

  componentDidMount() {
    this.props.loadArticle(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (props.id !== this.props.id) {
      this.props.loadArticle(props.id);
    }
  },

  render() {
    return (
      <span>{JSON.stringify(this.props.article)}</span>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    article: state.article.article
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadArticle: id => loadArticle(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
