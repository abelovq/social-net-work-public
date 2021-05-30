import { call } from '@redux-saga/core/effects';
import isEmail from 'validator/lib/isEmail';

export const validateForm = (form, errors) => {
  console.log(`form`, form)
  const errorsCopy = { ...errors }
  const isValid = [
    validatePassword(form.password, errorsCopy),
    validateEmail(form.email, errorsCopy),
    validatePasswordConfirm(form.password, form.passwordConfirm, errorsCopy)
  ].every(Boolean);
  return [isValid, errorsCopy]
}

const validatePassword = (password, errors) => {
  return validateField('password', !!password.trim(), 'empty password', errors)
    && validateField('password', password.length >= 6, 'min 6 symbols', errors)
}

const validatePasswordConfirm = (password, passwordConfirm, errors) => {
  return validateField('passwordConfirm', password === passwordConfirm, 'differ', errors)
}

const validateEmail = (email, errors) => {
  return validateField('email', !!email.trim(), 'empty email', errors)
    && validateField('email', isEmail(email), 'invalid email', errors)
}

function validateField(strName, predicate, errorMsg, errors) {
  errors[strName] = predicate ? null : errorMsg;
  return predicate
}

export const promisiftAction = (dispatch, createAction) => {
  return (...args) => {
    const action = createAction(...args)
    return new Promise((res, rej) => {
      return dispatch({ ...action, defer: { res, rej } })
    })
  }
}

export const rejectAction = (action, value) => {
  return action.defer ? call([action.defer, 'rej'], value) : null
}