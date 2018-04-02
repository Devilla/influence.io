import React, { Component } from 'react';
import { Row, Col, Tabs, Tab, Button, FormControl } from 'react-bootstrap';
import Slider from 'react-rangeslider'
import reactCSS from 'reactcss'
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { ChromePicker } from 'react-color';

const FONT_WEIGHT_BOLD = 'bold';
const FONT_WEIGHT_NORMAL = 'normal';


export class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBorderColorSwatchOpen: false,
      isBgColorSwatchOpen: false,
      isTextColorSwatchOpen: false,
      isLinkColorSwatchOpen: false
    }
    Object.assign(this.state, props.notificationPanelStyle);
  }

  handleRadiusChange = (radius) => {
    this.setState({ radius });
    this.props.onConfigChange({ prop: 'radius', value: radius });
  };

  handleBorderWidthChange = (borderWidth) => {
    this.setState({ borderWidth });
    this.props.onConfigChange({ prop: 'borderWidth', value: borderWidth });
  };

  handleBorderColorChange = (borderColor) => {
    borderColor = borderColor.rgb;
    this.setState({ borderColor });
    this.props.onConfigChange({ prop: 'borderColor', value: borderColor });
  };

  showBorderSwatch = () => {
    this.setState({
      isBorderColorSwatchOpen: true
    });
  };

  hideBorderSwatch = () => {
    this.setState({
      isBorderColorSwatchOpen: false
    });
  };

  handleShadowChange = (shadow) => {
    this.setState({ shadow });
    this.props.onConfigChange({ prop: 'shadow', value: shadow });
  };

  handleBlurChange = (blur) => {
    this.setState({ blur });
    this.props.onConfigChange({ prop: 'blur', value: blur });
  };

  handleBgColorChange = (backgroundColor) => {
    backgroundColor = backgroundColor.rgb;
    this.setState({ backgroundColor });
    this.props.onConfigChange({ prop: 'backgroundColor', value: backgroundColor });
  };

  showBgSwatch = () => {
    this.setState({
      isBgColorSwatchOpen: true
    });
  };

  hideBgSwatch = () => {
    this.setState({
      isBgColorSwatchOpen: false
    });
  };

  handleTextColorChange = (color) => {
    color = color.rgb;
    this.setState({ color });
    this.props.onConfigChange({ prop: 'color', value: color });
  }

  showTextColorSwatch = () => {
    this.setState({ isTextColorSwatchOpen: true });
  };

  hideTextColorSwatch = () => {
    this.setState({ isTextColorSwatchOpen: false });
  };

  handleFontChange = (e) => {
    const fontFamily = `${e.target.value}`;
    this.setState({ fontFamily });
    this.props.onConfigChange({ prop: 'fontFamily', value: fontFamily });
  };

  handleFontWeightChange = () => {
    let fontWeight = this.state.fontWeight;
    if(fontWeight === FONT_WEIGHT_BOLD)
      fontWeight = FONT_WEIGHT_NORMAL;
    else
      fontWeight = FONT_WEIGHT_BOLD;
    
    this.setState({fontWeight});
    this.props.onConfigChange({ prop: 'fontWeight', value: fontWeight });
  }

  render() {
    const styles = reactCSS({
      'default': {
        colorSwatch: {
          width: '68px',
          height: '21px',
          borderRadius: '2px',
        },
        border: {
          backgroundColor: `rgba(${this.state.borderColor.r}, ${this.state.borderColor.g}, ${this.state.borderColor.b}, ${this.state.borderColor.a})`
        },
        background: {
          backgroundColor: `rgba(${this.state.backgroundColor.r}, ${this.state.backgroundColor.g}, ${this.state.backgroundColor.b}, ${this.state.backgroundColor.a})`
        },
        textColor: {
          backgroundColor: `rgb(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b})`
        },
        swatch: {
          padding: '0px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div className="setting" style={{ backgroundColor: 'white' }}>
        <Tabs justified defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Box">
            <Row>
              <Col md={12}>
                <h4>Radius</h4>
                <div className='slider'>
                  <Slider
                    tooltip={false}
                    min={0}
                    max={50}
                    value={this.state.radius}
                    onChange={this.handleRadiusChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>Border</h4>
                <Row>

                  <Col md={3}>
                    <div style={styles.swatch} onClick={this.showBorderSwatch}>
                      <div style={{ ...styles.colorSwatch, ...styles.border }} />
                    </div>
                    {this.state.isBorderColorSwatchOpen ? <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.hideBorderSwatch} />
                      <ChromePicker color={this.state.borderColor} onChange={this.handleBorderColorChange} />
                    </div> : null}
                  </Col>
                  <Col md={9}>
                    <div className='slider alignment'>
                      <Slider
                        tooltip={false}
                        min={0}
                        max={10}
                        value={this.state.borderWidth}
                        onChange={this.handleBorderWidthChange}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>Shadow</h4>
                <Row>
                  <Col md={6}>
                    <div className='slider hf'>
                      <Slider
                        tooltip={false}
                        min={0}
                        max={10}
                        value={this.state.shadow}
                        onChange={this.handleShadowChange}
                      />
                      <small>stroke</small>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='slider hf'>
                      <Slider
                        tooltip={false}
                        min={0}
                        max={25}
                        value={this.state.blur}
                        onChange={this.handleBlurChange}
                      />
                      <small>blur</small>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <h4>Background Color</h4>
                  </Col>
                  <Col md={8}>
                    <div style={styles.swatch} onClick={this.showBgSwatch}>
                      <div style={{ ...styles.colorSwatch, ...styles.background }} />
                    </div>
                    {this.state.isBgColorSwatchOpen ? <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.hideBgSwatch} />
                      <ChromePicker color={this.state.backgroundColor} onChange={this.handleBgColorChange} />
                    </div> : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey={2} title="Text">
            <Row>
              <Col md={12}>
                <h4>Text Setting</h4>
                <Row>
                  <Col md={4}>
                    <div style={styles.swatch} onClick={this.showTextColorSwatch}>
                      <div style={{ ...styles.colorSwatch, ...styles.textColor }} />
                    </div>
                    {this.state.isTextColorSwatchOpen ? <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.hideTextColorSwatch} />
                      <ChromePicker color={this.state.color} onChange={this.handleTextColorChange} />
                    </div> : null}
                  </Col>
                  <Col md={4}>
                    <Button bsSize="small" block active={this.state.fontWeight == FONT_WEIGHT_BOLD} onClick={this.handleFontWeightChange}>
                      Bold
                    </Button>
                  </Col>
                  <Col md={4}>
                    <FormControl componentClass="select" bsSize="small" value={this.state.fontFamily} onChange={this.handleFontChange}>
                      <option value="arial">Arial</option>
                      <option value="monospace">Monospace</option>
                      <option value="georgia">Georgia</option>
                      <option value="inherit">Default</option>
                    </FormControl>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>Link Setting</h4>
                <Row>
                  <Col md={4}>
                    <div style={styles.swatch} className="bgcolor" onClick={this.handleClick}>
                      <div style={styles.color} />
                    </div>
                    {this.state.displayColorPicker ? <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.handleClose} />
                      <ChromePicker color={this.state.color} onChange={this.handleChange} />
                    </div> : null}
                  </Col>
                  <Col md={4}>
                    <Button bsSize="small" block>
                      Bold
                             </Button>
                  </Col>
                  <Col md={4}>
                    <FormControl componentClass="select" bsSize="small" placeholder="select">
                      <option value="arial">Arial</option>
                      <option value="sans-serif">Sen Serif</option>
                      <option value="helvetica">Helvetica</option>
                      <option value="open sans">Default</option>
                    </FormControl>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Tab>
          <Tab eventKey={3} title="Image">
            <ImagesUploader
              url="http://localhost:3009/notmultiple"
              optimisticPreviews
              multiple={false}
              onLoadEnd={(err) => {
                if (err) {
                  console.error(err);
                }
              }}
              label="Upload a picture"
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Setting;