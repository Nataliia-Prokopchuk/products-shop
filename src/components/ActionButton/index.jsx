import React from 'react';

import './style.scss';

class ActionButton extends React.PureComponent {
  render() {
    const {
      title,
      isDisabled,
      className = '',
    } = this.props;

    return (
      <button
        type="button"
        className={`action-button ${className}`}
        disabled={isDisabled}
      >
        {title}
      </button>

    );
  }
}

export default ActionButton;
