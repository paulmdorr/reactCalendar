// @flow
import React from 'react'
import { Grid, Typography, Paper, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isThisMonth, isToday } from 'date-fns'
import classnames from 'classnames'
import { StateConsumer } from '../App'

const useStyles = makeStyles({
  item: {
    borderTop: '1px solid #dadce0',
    borderLeft: '1px solid #dadce0',
    color: '#70757a',
    height: '20%',
    padding: '10px',
    textAlign: 'center',
    '& h3': {
      fontSize: '14px',
      height: '20%',
    },
    width: '14.28%',
  },
  disabled: {
    color: '#dadce0',
  },
  enabled: {
    color: '#70757a',
  },
  currentDay: {
    backgroundColor: '#d5fcc2',
  },
  reminders: {
    height: '80%',
    overflowY: 'auto',
  },
  reminder: {
    margin: '5px auto',
  },
  reminderText: {
    padding: '0 5px',
    textAlign: 'left',
  }
})

type Props = {
  date: Date,
  showReminder: Function,
}

const Day = ({ date, showReminder }: Props) => {
  const classes = useStyles()
  const isEnabled = !isThisMonth(date) ? classes.disabled : classes.enabled
  const itemClasses = classnames(classes.item, isToday(date) && classes.currentDay)
  const dayId = date.getTime()

  function handleClick(event) {
    showReminder(event.currentTarget, date)
  }

  return (
    <StateConsumer>
      {({ reminders }) => (
        <Grid item className={itemClasses} onClick={handleClick}>
          <Typography variant="h6" component="h3" className={isEnabled}>
            {date.getDate()}
          </Typography>
          <div className={classes.reminders}>
            {
              reminders[dayId] && reminders[dayId].map(reminder => (
                <Paper
                  key={reminder.id}
                  className={classes.reminder}
                  style={{ backgroundColor: reminder.color }}
                >
                  <Typography className={classes.reminderText} variant="body2">
                    { `(${reminder.time}) ${reminder.text}` }
                  </Typography>
                </Paper>
              ))
            }
          </div>
        </Grid>
      )}
    </StateConsumer>
  )
}

export default Day
