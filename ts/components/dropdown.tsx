import * as React from 'react';

interface DropdownProps {
  options: string[];
  onClick: () => void;
  value: string;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  return (
    <select>
      {
        props.options.map(o =>
          <option
            key={o}
            value={o}
            selected={o === props.value}
            onClick={props.onClick}>
              {o}
          </option>
        )
      }
    </select>
  );
}

export default Dropdown;