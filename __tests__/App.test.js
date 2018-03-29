import 'react-native'
import React from 'react'
import App from '../src/app'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('WebView', () => 'WebView')

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  )
})
