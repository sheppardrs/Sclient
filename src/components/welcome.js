import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Controls from '../containers/controls';
import Posts from '../containers/posts';
import Landing from './landing';

const Welcome = (props) => {
  let show;
  if (props.auth.authenticated) {
    show = (
      <div className="posts-page">
        <div className="posts-filters-box">
          <Controls />
          <Posts />
          {/* <Posts posts={posts} /> */}
        </div>
      </div>
    );
  } else {
    show = (
      <div>
        <Landing />
      </div>);
  }
  return (
    <div>
      { show }
    </div>
  );
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);


export default withRouter(connect(mapStateToProps, null)(Welcome));
