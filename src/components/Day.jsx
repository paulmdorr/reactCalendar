// @flow
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isThisMonth, isToday } from 'date-fns'
import classnames from 'classnames'
import { StateConsumer } from '../App'
import Reminder from './Reminder'

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
              reminders[dayId] && reminders[dayId]
                .sort((r1, r2) => {
                  return r1.time < r2.time ? -1 : 1
                })
                .map(reminder => (
                  <Reminder key={reminder.id} data={reminder} showReminder={showReminder} />
                ))
            }
          </div>
        </Grid>
      )}
    </StateConsumer>
  )
}

export default Day
