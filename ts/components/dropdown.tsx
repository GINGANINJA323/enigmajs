import * as React from 'react';
import { Select } from './elements';

interface DropdownProps {
  options: string[];
  onClick: () => void;
  value: string;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  return (
    <Select>
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
    </Select>
  );
}

export default Dropdown;