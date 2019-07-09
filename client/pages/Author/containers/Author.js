import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadAuthor, createAuthor, editAuthor } from 'common/actions/authors'
import AuthorForm, { FORM_ID } from '../components/AuthorForm'
import { getAuthor } from 'common/selectors/entities'
import { formValueSelector } from 'redux-form'
import PageLoader from 'common/components/PageLoader'
import { Map } from 'immutable'

class AuthorContainer extends Component {
  static propTypes = {
    loadAuthor: PropTypes.func.isRequired,
    editAuthor: PropTypes.func.isRequired,
    createAuthor: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    params: PropTypes.object,
    isEditing: PropTypes.bool.isRequired,
    author: PropTypes.instanceOf(Map)
  }

  // TODO: should add an componentWillReceiveProps + loadAuthor with new ID when route changes to other article
  componentWillMount () {
    const { isEditing, loadAuthor, params } = this.props

    if (isEditing) {
      loadAuthor(params.id)
    }
  }

  handleSubmit = data => {
    const {
      isEditing,
      params,
      editAuthor,
      createAuthor
    } = this.props

    if (isEditing) {
      return editAuthor({
        id: params.id,
        data
      })
    }

    createAuthor(data)
  }

  render () {
    const { isEditing, author, firstName, lastName } = this.props

    if (isEditing && !author) {
      return (
        <PageLoader />
      )
    }

    const initialValues = (isEditing && author) ? {
      firstName: author.get('firstName'),
      lastName: author.get('lastName')
    } : {}

    return (
      <AuthorForm
        firstName={firstName}
        lastName={lastName}
        isEditing={isEditing}
        initialValues={initialValues}
        onSubmit={this.handleSubmit} />
    )
  }
}

const valueSelector = formValueSelector(FORM_ID)

const mapStateToProps = (state, ownProps) => {
  const isEditing = !!ownProps.params.id

  return {
    author: getAuthor(ownProps.params.id)(state),
    isEditing,
    firstName: valueSelector(state, 'firstName'),
    lastName: valueSelector(state, 'lastName')
  }
}

const mapActionsToProps = {
  loadAuthor,
  editAuthor,
  createAuthor
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthorContainer)
