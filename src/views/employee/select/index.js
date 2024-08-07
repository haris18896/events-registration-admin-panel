import React from 'react'
import Select from 'react-select'

export default ({ onChange, options, value, className }) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ''
  }

  return (
    <Select
      className={className}
      classNamePrefix='select'
      value={defaultValue(options, value)}
      onChange={value => {
        onChange(value)
      }}
      options={options}
    />
  )
}
