import reducer from '../reducers/limehome'
import { initialState } from '../reducers/limehome'

describe('limehome reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle LOCATION_ONCHANGE', () => {
    expect(
      reducer(initialState,
      {
        type: 'LOCATION_ONCHANGE',
        value: { value: '6.522500,3.321350' }
      })
    ).toMatchSnapshot()
  })
})
