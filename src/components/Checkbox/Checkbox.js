import React from 'react';
import './Checkbox.css';
function Checkbox({ id }) {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <label className="checkbox">
      <input
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        checked={isChecked}
        className="checkbox__invisible-checkbox"
        type="checkbox"
        id={id}
        tabIndex="-1"
      />
      <span className="checkbox__visible-checkbox"></span>
    </label>
  );
}

export default Checkbox;
