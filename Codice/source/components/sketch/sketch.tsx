/*
 * Author: Giulia Petenazzi
 * File: source/components/sketch/sketch.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { SketchInterface, SketchStateInterface } from './sketchInterface';

export class Sketch extends React.Component<SketchInterface, SketchStateInterface> {

  constructor(props: SketchInterface) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = {
      displayColorPicker: false,
    };
  }

  public render() {
    const styles: any = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(
          ${ this.props.color.r },
          ${ this.props.color.g },
          ${ this.props.color.b },
          ${ this.props.color.a })`,
        },
        colorDisabled: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(
          ${ '210' },
          ${ '210' },
          ${ '210' },
          ${ '50' })`,
        },
        swatch: {
          marginBottom: '1em',
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          cursor: 'default',
        },
        swatchDisabled: {
          marginBottom: '1em',
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'not-allowed',
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
      <div>
        <div
          style = {this.props.disabled ? styles.swatchDisabled : styles.swatch}
          onClick = {this.handleClick}
        >
          <div
            style = {this.props.disabled ? styles.colorDisabled : styles.color}
          />
        </div>
        {this.state.displayColorPicker  && !this.props.disabled
          ? <div style = {styles.popover}>
          <div style = {styles.cover} onClick = {this.handleClose}/>
          <SketchPicker
            color = {this.props.color}
            onChange = {this.handleColorChange}
          />
          </div> : null}
      </div>
    );
  }

  private handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  private handleClose() {
    this.setState({ displayColorPicker: false });
  }

  private handleColorChange(color: any) {
    this.props.handleChange('color', color.rgb);
  }

}
