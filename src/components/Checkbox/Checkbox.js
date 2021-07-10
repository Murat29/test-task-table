import React from 'react';
import './Checkbox.css';
function Checkbox({ id, checked, handleChange }) {
  return (
    <label className="checkbox">
      <input
        onChange={handleChange}
        checked={checked}
        className="checkbox__invisible-checkbox"
        type="checkbox"
        id={id}
        name={id}
        tabIndex="-1"
      />
      <span className="checkbox__visible-checkbox"></span>
    </label>
  );
}

export default Checkbox;
