// @flow
/* Action types */
export const SAVE_REMINDER = 'SAVE_REMINDER'

/* Types for flow */
export type GlobalState = {
  days: Date[],
  dispatch: Function,
  reminders: Object,
}

export const reducer = (state: GlobalState, action: Object): GlobalState => {
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
