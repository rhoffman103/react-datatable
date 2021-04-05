import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import {usePopper} from "react-popper";
import Portal from './Portal';

const DTDropdown = ({ title, modifiers, children }) => {
  const [isVisible, setVisibility] = React.useState(false);
  const triggerRef = React.useRef();
  const popupRef = React.useRef();
  const { styles, attributes } = usePopper(
    triggerRef.current,
    popupRef.current,
    {
      placement: 'bottom-start',
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
              offset: [0, 0],
          },
        },
        ...modifiers || [],
      ]
    }
  );

  const handleClick = () => setVisibility((prev) => !prev);

  const handleOutsideClick = (e) => {
    if (popupRef.current.contains(e.target) || triggerRef.current.contains(e.target)) {
      return;
    }
    setVisibility(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button className="dropdown-trigger" ref={triggerRef} onClick={handleClick}>
        {title}
      </button>

      <Portal>
        <div className="dropdown-container" ref={popupRef} style={styles.popper} {...attributes.popper}>
          {isVisible &&
            <div className="dropdown-body">
              {children}
            </div>
          }
        </div>
      </Portal>
    </>
  );
};

DTDropdown.propTypes = {
  title: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.object)
};

export default DTDropdown;