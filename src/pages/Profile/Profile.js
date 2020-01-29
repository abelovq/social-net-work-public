import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function Profile( {userData, posts} ) {
    const { id, email, firs_name: first_name, last_name } = userData;
    const getPostssByUser = (userId, posts) => {
        console.log(userId, posts)
        return posts.reduce((acc, post) => {
            if (userId == post.user_id) {
                acc.push(post);
            }
            return acc;
        }, [])
    }
    let userPosts;
    if (posts) {
        userPosts = getPostssByUser(id, posts);
    }
    return (
        <div>
            Info:
            {' '}
            {email}
            {first_name}
            {last_name}
            <br />
            Posts:
            {' '}
            {userPosts.length ? userPosts.map(post => 
                <div
                    key={post.id}
                    style={{ marginBottom: "10px", backgroundColor: "#eee" }}
                >
                    <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/posts/${post.id}`}
                        >
                        <p>Post title: {post.title}</p>
                        <span>Post description: {post.description}</span>
                    </NavLink>
              </div> 
              
            ) : <p>Not posts yet</p>  } 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.login.user,
        posts: state.posts.posts
    }
}

export default withRouter(connect(mapStateToProps)(Profile))
