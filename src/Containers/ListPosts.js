import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import { getPosts, savePost, deletePost } from '../Actions/PostActions';
import { getUser, logout } from '../Actions/UserActions';
import '../Styles/App.css';
import PostCard from '../Components/PostCard';

class App extends Component {
  componentWillMount() {
    this.props.getPosts();
    this.props.getUser();
    if (this.props.user.loading === false && this.props.user.email === undefined) {
      this.props.history.replace('/Login')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loading === false && nextProps.user.email === undefined) {
      this.props.history.replace('/Login')
    }
  }
  renderField(field) {
    return (
      <input
        type="text"
        placeholder={`Enter a ${field.label}...`}{...field.input}
        className={field.class}/>
    )
  }
  onSubmit(values) {
    this.props.savePost(values).then(this.props.dispatch(reset('NewPost')));
  }
  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <PostCard key={key}>
          <h3 className="card-title">{post.title}</h3>
          <p className="card-text">{post.body}</p>
          <button
            className="btn btn-danger float-right"
            onClick={() => {
              this.props.deletePost(key);
            }}>
              Delete
          </button>
        </PostCard>
      )
    })
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="navbar">
          <button className="btn btn-danger" onClick={() => {this.props.logout()}}>Sign out</button>
        </div>
        <div className="container">
          <div className="main">
            {this.renderPosts()}
          </div>
          <div className="navbar fixed-bottom">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="title"
                component={this.renderField}
                label="Title"
                class="footer-title"
              />
              <Field
                name="body"
                component={this.renderField}
                label="Body"
                class="footer-body"
              />
              <button type="submit" className="btn footer-button">Post</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(App);

form = connect((state, ownProps) => ({
  posts: state.posts,
  user: state.user
}), { getPosts, savePost, deletePost, getUser, logout })(form);

export default form;

// function mapStateToProps(state) {
//   return { posts: state.posts };
// }

// export default connect(mapStateToProps, {})(App);
