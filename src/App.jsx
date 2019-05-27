// @flow
import React, { useState } from 'react'
import { getDays } from './utils/toolBox'
import Month from './components/Month'

type GlobalState = {
  days: Date[],
  dispatch: Function,
  reminders: Object,
}

const Context = React.createContext<GlobalState>({
  days: getDays(Date.now()),
  dispatch: f => f,
  reminders: {},
})
export const SAVE_REMINDER = 'SAVE_REMINDER'

const reducer = (state, action): GlobalState => {
  switch (action.type) {
    case (SAVE_REMINDER):
      const reminders = { ...state.reminders }

      reminders[action.id] = reminders[action.id] ? [...reminders[action.id]] : []
      reminders[action.id].push(action.reminder)

      return { ...state, reminders }
    default:
      return state
  }
}

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
