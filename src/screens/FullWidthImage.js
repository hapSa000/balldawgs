import React, {Component} from 'react';
import {
  Image,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export default class FullWidthImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this._onLayout();
  }

  _onLayout() {
    const containerWidth = Dimensions.get('screen').width;

    this.setState({
      width: containerWidth,
      height: containerWidth * 0.5,
    });

    Image.getSize(this.props.source, (width, height) => {
      this.setState({
        width: containerWidth,
       // height: (containerWidth * height) / width,
       height:
          (containerWidth * height) / width > 500
            ? 450
            : (containerWidth * height) / width,
      });
    });
  }

  render() {
    return (
      <Image
        blurRadius={this.props.blurRadius}
        source={{uri: this.props.source}}
        style={{
          ...this.props.postImageStyles,
          width: this.state.width,
          height: this.state.height,
        }}
      />
    );
  }
}
