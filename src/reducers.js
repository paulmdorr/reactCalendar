// @flow
/* Action types */
export const SAVE_REMINDER = 'SAVE_REMINDER'

/* Types for flow */
export type Reminder = {
  id: string,
  text: string,
  date: Date,
  color: string,
  time: string,
}
export type GlobalState = {
  days: Date[],
  dispatch: Function,
  reminders: { [number]: Reminder[] },
}

export const reducer = (state: GlobalState, action: Object): GlobalState => {
  switch (action.type) {
    case (SAVE_REMINDER):
      const reminders = { ...state.reminders }

      reminders[action.id] = reminders[action.id] ? [...reminders[action.id]] : []

      // Remove reminder if it exists
      if (reminders[action.prevId].find(reminder => reminder.id === action.reminder.id)) {
        reminders[action.prevId] = reminders[action.prevId]
          .filter(reminder => reminder.id !== action.reminder.id)
      }
      reminders[action.id].push(action.reminder)

      return { ...state, reminders }
    default:
      return state
  }
}
