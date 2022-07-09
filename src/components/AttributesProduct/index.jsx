import React from 'react';

import './style.scss';

class AttributesProduct extends React.PureComponent {
  selectField = (name, value) => {
    const { selectedAttributes } = this.props;

    return (
      Object.keys(selectedAttributes).some((key) => (
        (selectedAttributes[key] === value) && (key === name)))
    );
  };

  render() {
    const { attributes, chooseAttributes } = this.props;

    return (
      attributes.map((attr) => (
        <div key={attr.name} className="attributes">
          <div className="title-attr">{`${attr.name}:`}</div>
          <div className="item">
            {
              attr.items.map((item) => (
                (attr.name === 'Color') ? (
                  <div
                    key={item.value}
                    className={`color ${this.selectField(attr.name, item.value) ? 'selected-field-color' : ''}`}
                    style={{ backgroundColor: item.value }}
                    onClick={chooseAttributes(attr.name, item.value)}
                  />
                ) : (
                  <div
                    key={item.value}
                    className={`no-color ${this.selectField(attr.name, item.value) ? 'selected-field' : ''}`}
                    onClick={chooseAttributes(attr.name, item.value)}
                  >
                    {item.value}
                  </div>
                )
              ))
            }
          </div>
        </div>
      ))

    );
  }
}

export default AttributesProduct;
