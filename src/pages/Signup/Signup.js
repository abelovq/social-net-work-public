import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { TextField, Container } from '@material-ui/core';

import { registerUser } from '../../store/actions';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        password_confirm: '',
    }

    handleInput = ( {target} ) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { email, password, password_confirm } = this.state;
        if (email && password) {
            if (password === password_confirm) {
                const data = {
                    email,
                    password,
                    password_confirm
                }
                this.props.registerUser(data);
            }
        }
        return;
    }

    render() {
        const { isLogged } = this.props.registerData;
        return (
            <Container maxWidth="sm">
                {isLogged && <Redirect to="main" />}
                <h1>welcome to social net work</h1>
                <form noValidate autoComplete="off" onSubmit={this.handleRegister}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={this.state.email}
                        label="Email Address"
                        type="email"
                        name="email"
                        fullWidth
                        onChange={this.handleInput}
                    />
                    <TextField
                        value={this.state.password}
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        onChange={this.handleInput}
                    />
                    <TextField
                        value={this.state.password_confirm}
                        margin="dense"
                        id="name"
                        label="Confirm password"
                        type="password"
                        name="password_confirm"
                        fullWidth
                        onChange={this.handleInput}
                    />
                    <button 
                        style={{marginTop: '20px'}} 
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        registerData: state.register
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        registerUser: (data) => dispatch(registerUser(data))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Signup);