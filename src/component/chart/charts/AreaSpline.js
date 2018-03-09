// @flow
'use strict'

import React from 'react'
import {
  View,
  ART
} from 'react-native'

const {
  Surface,
  Group,
  Path
} = ART

import AnimGradientShape from '../art/AnimGradientShape'
import AnimPoint from '../art/AnimPoint'
import AnimLine from '../art/AnimLine'

import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as format from 'd3-format'
import * as axis from 'd3-axis'

const d3 = {
  scale,
  shape,
  format,
  axis,
}

type Props = {
  height: number,
  width: number,
  color: any,
  data: any
};

const margin = 0

class AreaSpline extends React.Component {

  constructor(props: Props) {
    super(props)
    this._createArea = this._createArea.bind(this)
    this._Xvalue = this._Xvalue.bind(this)
    this._Yvalue = this._Yvalue.bind(this)
    this._label = this._label.bind(this)
  }
  _getMaxValue() {
    let max = 1
    this._getData().forEach(i => {
      max = i.value > max ? i.value : max
    })
    return max
  }
  //TODO: expose this methods as part of the AreaSpline interface.
  _Yvalue(item, index) {
    return -this.props.height * item.value / this._getMaxValue() + 6
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _Xvalue(item, index) {
    return index * (this.props.width) / (this._getData().length - 1)
  }

  //TODO: expose this methods as part of the AreaSpline interface.
  _label(item, index) { return item.name }

  // method that transforms data into a svg path (should be exposed as part of the AreaSpline interface)
  _createArea() {
    var that = this
    var area = d3.shape.area()
      .x(function (d, index) { return that._Xvalue(d, index) })
      .y1(function (d, index) { return that._Yvalue(d, index) })
      .curve(d3.shape.curveNatural)(this._getData())

    return { path: area }
  }

  _createLine() {
    var that = this
    var lines = d3.shape.line()
      .x(function (d, index) { return that._Xvalue(d, index) })
      .y(function (d, index) { return that._Yvalue(d, index) })
      .curve(d3.shape.curveNatural)(this._getData())
    console.log(lines)
    return { path: lines }
  }
  _createPoint(item, key) {
    console.log(item, this._Xvalue(item, key), this._Yvalue(item, key))
    let x = this._Xvalue(item, key)
    let y = this._Yvalue(item, key)
    let path = new Path()
      .moveTo(x, y)
      .line(0, 0)
    return { path }
  }
  _getData() {
    return this.props.data || []
  }
  render() {
    const x = margin
    const y = this.props.height - margin
    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            <AnimGradientShape
              width={this.props.width}
              height={this.props.height}
              color={this.props.color}
              d={() => this._createArea()}
            />
          </Group>
          <Group x={x} y={y}>
            <AnimLine
              color={this.props.strokeColor || '#fff'}
              strokeWidth={this.props.strokeWidth}
              d={() => this._createLine()}
            />
          </Group>
          <Group x={x} y={y}>
            {
              this._getData().map((item, key) =>
                <AnimPoint
                  key={key}
                  color={this.props.pointColor || '#fff'}
                  size={this.props.size}
                  d={() => this._createPoint(item, key)}
                />)
            }
          </Group>
        </Surface>
      </View>
    )
  }
}

export default AreaSpline
