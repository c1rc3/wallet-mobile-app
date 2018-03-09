import React from 'react'
import {
  View,
  ART,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  Text
} from '../../../component/commons'

const {
  Surface,
  Group
} = ART

import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import AnimShape from '../art/AnimShape'
import Theme from '../theme'
import styles from './styles'

const d3 = {
  scale,
  shape,
}

type Props = {
  height: number,
  width: number,
  pieWidth: number,
  pieHeight: number,
  colors: any,
  onItemSelected: any
};

type State = {
  highlightedIndex: number,
};

class Pie extends React.Component {

  state: State;

  constructor(props: Props) {
    super(props)
    this.state = { highlightedIndex: 0 }
    this._createPieChart = this._createPieChart.bind(this)
    this._value = this._value.bind(this)
    this._label = this._label.bind(this)
    this._color = this._color.bind(this)
    this._onPieItemSelected = this._onPieItemSelected.bind(this)
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item) { return item.number }

  _label(item) { return item.name }

  _color(index) { return this.props.colors ? this.props.colors[index % this.props.colors.length] : Theme.colors[index % Theme.colors.length] }

  _createPieChart(index) {
    var arcs = d3.shape.pie()
      .value(this._value)(this.props.data)
    let innerRadius = this.props.pieWidth / 2 * 0.38
    let radius = this.props.pieWidth / 1.7
      - index * (this.props.pieWidth / (3.6 * (this.props.data.length - 1)))

    var hightlightedArc = d3.shape.arc()
      .outerRadius(radius * 1.02)
      .innerRadius(innerRadius)
      .cornerRadius(2)

    var shadowedArc = d3.shape.arc()
      .outerRadius(radius * 1.1)
      .innerRadius(innerRadius * 0.9)
      .padAngle(-100)
      .cornerRadius(2)

    var arc = d3.shape.arc()
      .outerRadius(radius)
      .padAngle(-1)
      .innerRadius(innerRadius)
      .cornerRadius(2)

    var arcData = arcs[index]
    arcData.startAngle += Math.PI
    arcData.endAngle += Math.PI
    arcData.endAngle += 0.1

    var shadowData = { ...arcs[index] }
    shadowData.endAngle += 0.1
    shadowData.startAngle -= 0.1

    var path = (this.state.highlightedIndex === index) ? hightlightedArc(arcData) : arc(arcData)
    var shadowPath = (this.state.highlightedIndex === index) ? shadowedArc(shadowData) : null
    return {
      path,
      shadowPath,
      color: this._color(index)
    }
  }

  _renderPie() {
    let res = []
    this.props.data.forEach((item, index) => {
      item.id = item.id || index
      let createdPie = this._createPieChart(index)

      res = [
        <AnimShape
          key={'pie_shape_' + item.id}
          color={createdPie.color}
          d={() => ({
            path: createdPie.path
          })}
        />,
        ...res
      ]

    })
    let idx = this.props.data.length - this.state.highlightedIndex - 1
    res = [
      ...res.slice(0, idx),
      ...res.slice(idx + 1),
      res[idx]
    ]
    return res
  }

  _onPieItemSelected(index) {
    this.setState({ ...this.state, highlightedIndex: index })
    this.props.onItemSelected ? this.props.onItemSelected(index) : null
  }

  _renderLegends() {
    return this.props.data.slice(0, 3).map((item, index) => {
      var fontWeight = this.state.highlightedIndex === index ? 'bold' : '600'
      return (
        <TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}>
          <View style={styles.pie_legend_item_container}>
            <View style={[styles.pie_legend_item_bullet, { backgroundColor: this._color(index) }]}>
            </View>
            <View style={styles.pie_legend_item}>
              <Text style={[styles.pie_legend_item_label, { fontWeight: fontWeight }]}>{this._label(item)}: {this._value(item)}%</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  render() {
    const margin = styles.container.margin
    const x = this.props.pieWidth / 2 + margin
    const y = this.props.pieHeight / 2 + margin

    return (
      <View width={this.props.width} height={this.props.height} style={{ padding: margin, paddingTop: 0 }}>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            {this._renderPie()}
          </Group>
        </Surface>
        <View style={[styles.pie_info_container, { position: 'absolute', top: margin * 2, left: 3 * margin + this.props.pieWidth }]}>
          <Text style={styles.pie_title}>TOTAL AMOUNT</Text>
          <Text style={styles.pie_total}>2.95586 BTC</Text>
          <View style={styles.pie_legend_container}>
            {
              this._renderLegends()
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Pie
