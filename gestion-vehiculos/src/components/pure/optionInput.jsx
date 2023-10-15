import React from 'react'
import { PropTypes } from "prop-types";

export default function OptionInput({value, text}) {
  return (
    <option value={value}>{text}</option>
  )
}

OptionInput.propTypes = {
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired

}
