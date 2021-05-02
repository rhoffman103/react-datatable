import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const portalEl = React.useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(portalEl);
    return () => document.body.removeChild(portalEl);
  }, [portalEl]);

  return ReactDOM.createPortal(children, portalEl);
};

export default Portal;