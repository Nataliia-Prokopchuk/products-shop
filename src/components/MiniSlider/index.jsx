import React from 'react';
import Arrow from '../../assets/icons/arrow.svg';

import './style.scss';

class MiniSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countImage: props.gallery ? 0 : '',
    };
  }

  getNextImage = () => {
    const { countImage } = this.state;
    const { gallery } = this.props;

    const count = (gallery.length > countImage + 1) ? (countImage + 1) : 0;

    this.setState({
      countImage: count,
    });
  };

  getPrevImage = () => {
    const { countImage } = this.state;
    const { gallery } = this.props;

    const count = (countImage !== 0) ? (countImage - 1) : gallery.length - 1;

    this.setState({
      countImage: count,
    });
  };

  render() {
    const { countImage } = this.state;
    const { gallery } = this.props;

    return (
      <div className="mini-gallery">
        <div className="image">
          <img src={gallery[countImage]} alt="product" />
        </div>
        <div className="container-button">
          <div className="arrow-left" onClick={this.getPrevImage}>
            <img src={Arrow} alt="arrow" />
          </div>
          <div className="arrow-right" onClick={this.getNextImage}>
            <img src={Arrow} alt="arrow" />
          </div>
        </div>
      </div>
    );
  }
}

export default MiniSlider;
