import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from '../Select'
import Loader from 'common/components/Loader'
import { getAllAuthors } from 'api/authors'

export default class AuthorSelect extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired
  }

  state = {
    isLoaded: false,
    authors: null
  }

  loadAuthors () {
    getAllAuthors().then(authors => {
      this.setState({
        authors,
        isLoaded: true
      })
    })
  }

  componentWillMount () {
    this.loadAuthors()
  }

  filterFullName = a => a != null ? `${a.firstName} ${a.lastName}` : null

  render () {
    const { isLoaded, authors } = this.state

    if (!isLoaded) {
      return (
        <Loader primary />
      )
    }

    const _id = typeof this.props.input.value === 'object'
      ? this.props.input.value._id
      : this.props.input.value

    const defaultValue = authors.find((a) => a._id === _id)

    return (
      <Select
        value={this.filterFullName(defaultValue)}
        data={authors}
        {...this.props} />
    )
  }
}
