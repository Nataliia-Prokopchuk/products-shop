import React from 'react';

import './style.scss';

class AttributesProduct extends React.PureComponent {
  render() {
    const { attributes } = this.props;

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
                    className="color"
                    style={{ backgroundColor: item.value }}
                  />
                ) : (
                  <div
                    key={item.value}
                    className="no-color"
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
