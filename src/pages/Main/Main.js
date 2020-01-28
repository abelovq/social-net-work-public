import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Posts from '../../components/Posts';

class Main extends Component {
    render() {
        return (
            <div>
                <Layout header={<Header />}>
                    <Posts />
                </Layout>
            </div>
        )
    }
}

export default withRouter(Main);
