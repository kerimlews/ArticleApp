import React from 'react'
import PropTypes from 'prop-types'
import styles from './Author.scss'
import { Map } from 'immutable'
import * as Routes from 'constants/Routes'
import { Link, formatPattern } from 'react-router'
import moment from 'moment'

const Author = ({ author }) => {
  const date = moment(author.get('created'))

  return (
    <div className={styles.component}>
      <Link
        className={styles.title}
        to={formatPattern(Routes.AUTHOR, {
          id: author.get('_id')
        })}>
        {author.get('firstName')}
        {' '}
        {author.get('lastName')}
      </Link>
      <div className={styles.date}>
        {date.format('LLLL')}
      </div>
    </div>
  )
}

Author.propTypes = {
  author: PropTypes.instanceOf(Map).isRequired
}

export default Author
