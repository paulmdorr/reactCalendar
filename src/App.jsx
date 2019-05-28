// @flow
import React, { useState } from 'react'
import { getDays } from './utils/toolBox'
import Month from './components/Month'
import { type GlobalState, reducer } from './reducers'

const Context = React.createContext<GlobalState>({
  days: getDays(Date.now()),
  dispatch: f => f,
  reminders: {},
})

const App = () => {
  const [globalState: GlobalState, setGlobalState] = useState<GlobalState>({
    days: getDays(Date.now()),
    dispatch: action => {
      setGlobalState(state => reducer(state, action))
    },
    reminders: {},
  })

  return (
    <Context.Provider value={globalState}>
      <Month />
    </Context.Provider>
  )
}

export default App

export const StateConsumer = Context.Consumer
