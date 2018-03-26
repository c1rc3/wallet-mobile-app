import React from 'react'
import { SCREEN_OPTIONS } from './const'

export class CommonScreen extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
    }
}