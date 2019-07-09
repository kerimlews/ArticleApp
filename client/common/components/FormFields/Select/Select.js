import React from 'react'
import PropTypes from 'prop-types'
import Combobox from 'react-widgets/lib/Combobox'
import styles from './Select.scss'
import 'react-widgets/dist/css/react-widgets.css'

const ListItem = ({ item }) => (
  <span>
    <strong>{item.firstName} {item.lastName}</strong>
  </span>
)

const Select = ({
  input,
  ...props
}) => {
  if (input.value === '') {
    input.value = []
  }

  return (
    <div className={styles.component}>
      <Combobox
        onChange={input.onChange}
        defaultValue={[]}
        itemComponent={ListItem}
        {...props} />
    </div>
  )
}

Select.propTypes = {
  input: PropTypes.object.isRequired
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default Select
