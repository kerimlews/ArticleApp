import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Input } from 'common/components/FormFields'
import Button from 'common/components/Button'
import FormGroup from 'common/components/FormGroup'
import styles from './AuthorForm.scss'

export const FORM_ID = 'author'

export const validate = values => {
  const errors = {}
  const required = [
    'firstName',
    'lastName'
  ]

  required.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

export const AuthorForm = ({
  handleSubmit,
  isEditing,
  firstName,
  lastName
}) => {
  const fullName = `${firstName || ''} ${lastName || ''}`
  return (
    <form
      className={styles.component}
      onSubmit={handleSubmit}>
      <h1>
        {isEditing ? `Editing ${fullName}` : `Creating author ${fullName || ''}`}
      </h1>
      <FormGroup>
        <Field
          name='firstName'
          component={Input}
          placeholder='First name'
          label='First name' />
      </FormGroup>
      <FormGroup>
        <Field
          name='lastName'
          component={Input}
          placeholder='Last name'
          label='Last name' />
      </FormGroup>
      <Button
        primary
        type='submit'>
        {isEditing ? 'Save' : 'Create'} author
      </Button>
    </form>
  )
}

AuthorForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export default reduxForm({
  form: FORM_ID,
  validate
})(AuthorForm)
