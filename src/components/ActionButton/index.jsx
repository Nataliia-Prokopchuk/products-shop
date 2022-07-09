import React from 'react';

import './style.scss';

class ActionButton extends React.PureComponent {
  render() {
    const {
      title,
      isDisabled,
      className = '',
      addInCart,
    } = this.props;

    return (
      <button
        type="button"
        className={`action-button ${className}`}
        disabled={isDisabled}
        onClick={addInCart}
      >
        {title}
      </button>

    );
  }
}

export default ActionButton;
