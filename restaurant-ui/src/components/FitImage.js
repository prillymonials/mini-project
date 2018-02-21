import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Fit Image class
 * A component make the picture show only max height
 * Because when it too big, the detail will be disappeared
 * 
 * Props:
 * - src (String): Picture source
 * - alt (String): Picture alternate text when image cannot be loaded
 * - maxHeight (Number): The height of the image to shown when the image is too big (in px).
 */
class FitImage extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        maxHeight: PropTypes.number.isRequired
    };

    /**
     * - containerStyle (Object)
     *   Style container of the image. Property is the CSS Object properties.
     * - imageStyle
     *   Style of the image. Property is the CSS Object properties.
     */
    state = {
        containerStyle: {},
        imageStyle: {}
    };

    componentDidMount() {
        window.addEventListener('resize', this.setStyle);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setStyle);
    }

    render() {
        return (
            <div className="app-fit-image" style={this.state.containerStyle}>
                <img
                    onLoad={this.onLoadImage}
                    ref={(imageApp) => { this.imageApp = imageApp; }}
                    src={this.props.src}
                    alt={this.props.alt}
                    style={this.state.imageStyle}
                />
            </div>
        );
    }

    /**
     * On Load Image function
     * When image is loaded from the server, it will be 1st call the set style function.
     */
    onLoadImage = () => {
        this.setStyle();
    };

    /**
     * Set Style function
     * It will be running when 1st render and when user resize the screen
     * This function will set the style of the container and image CSS
     * If it still fit, it will have no style
     * Otherwise, make a picture as the maxHeight by user defined.
     */
    setStyle = () => {
        const maxHeight = this.props.maxHeight;
        const imageHeight = this.imageApp.clientHeight;

        if (imageHeight > maxHeight) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    containerStyle: { height: `${maxHeight}px`, overflow: 'hidden' },
                    imageStyle: { width: '100%', marginTop: `${(maxHeight - imageHeight) / 2}px` }
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    containerStyle: {},
                    imageStyle: {}
                }
            });
        }
    };
}

export default FitImage;