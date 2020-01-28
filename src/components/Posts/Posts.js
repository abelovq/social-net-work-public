import React, { Component } from 'react';
import { connect } from 'react-redux';

class Posts extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Posts);
