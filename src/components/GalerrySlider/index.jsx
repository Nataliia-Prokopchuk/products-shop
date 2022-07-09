import React from 'react';

import './style.scss';

class GalerrySlider extends React.PureComponent {
  render() {
    const {
      gallery,
      selectedPhoto,
      choosePhoto,
    } = this.props;

    return (
      <div className="images-product">
        <div className="slider">
          {
            gallery.map((imageURL) => (
              (selectedPhoto === imageURL) ? (
                <div
                  key={imageURL}
                  className="productImg selected-photo"
                  onClick={choosePhoto(imageURL)}
                >
                  <img src={imageURL} alt="product" />
                </div>
              ) : (
                <div
                  key={imageURL}
                  className="productImg"
                  onClick={choosePhoto(imageURL)}
                >
                  <img src={imageURL} alt="product" />
                </div>
              )
            ))
          }
        </div>
        <div className="currentImage">
          <img src={selectedPhoto} alt="product" />
        </div>
      </div>
    );
  }
}

export default GalerrySlider;
