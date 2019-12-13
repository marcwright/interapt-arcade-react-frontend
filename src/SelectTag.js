import React from 'react'

const SelectTag = props => (
  <div>
    <select onChange={e => props.handleChange(e)} className="custom-select selectTagNav" name="projectNumber">
      <option value="" defaultValue>CHOOSE A PROJECT</option>
      <option value="1">Project 1</option>
      <option value="2">Project 2</option>
      <option value="3">Project 3</option>
      <option value="4">Project 4</option>
    </select>
  </div>
)

export default SelectTag