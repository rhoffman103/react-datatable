import React, {forwardRef} from "react";
import PropTypes from "prop-types";

const DefaultFooter = forwardRef((props, ref) => {

  return (
    <div className="dt-footer" ref={ref} style={props.style}>
      <span className="dt-records">showing {props.totalItems} records</span>
    </div>
  );
});

DefaultFooter.displayName = "DefaultFooter";

DefaultFooter.propTypes = {
  style: PropTypes.object,
  visibleItems: PropTypes.number,
  totalItems: PropTypes.number
};

DefaultFooter.defaultProps = {
  style: {},
  visibleItems: 0,
  totalItems: 0
};

export default DefaultFooter;