// @flow
import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  reminder: {
    backgroundColor: ({ color }) => color,
    margin: '5px auto',
  },
  reminderText: {
    padding: '0 5px',
    textAlign: 'left',
  }
})

type Props = {
  data: Object,
  showReminder: Function,
}

const Reminder = ({ data, showReminder }: Props) => {
  const classes = useStyles({ color: data.color })

  function handleClick(event) {
    event.stopPropagation()
    showReminder(event.currentTarget, data.date, data)
  }

  return (
    <Paper
      className={classes.reminder}
      style={{ backgroundColor: data.color }}
      onClick={handleClick}
    >
      <Typography className={classes.reminderText} variant="body2">
        { `(${data.time}) ${data.text}` }
      </Typography>
    </Paper>
  )
}

export default Reminder
