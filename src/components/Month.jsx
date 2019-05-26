// @flow
import React from 'react'
import { startOfMonth, endOfMonth, eachDay, subDays, addDays, format } from 'date-fns'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Day from './Day'
import ReminderForm from './ReminderForm'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    borderBottom: '1px solid #dadce0',
    borderRight: '1px solid #dadce0',
    height: '85vh',
    margin: '0 auto',
    width: '70%',
  },
  borderlessContainer: {
    margin: '0 auto',
    width: '70%',
  },
  header: {
    fontWeight: 300,
    textAlign: 'center',
  },
  dayName: {
    backgroundColor: '#d2e3fc',
    padding: '5px',
    textAlign: 'center',
    width: '14.28%',
    '& h2': {
      fontSize: '18px',
      fontWeight: 300,
    }
  }
}))

function getDays(date) {
  const firstDay = startOfMonth(date)
  let extraBeforeDays = firstDay.getDay()
  let daysBefore = []
  const lastDay = endOfMonth(date)
  let extraAfterDays = 6 - lastDay.getDay()
  let daysAfter = []

  while (extraBeforeDays > 0) {
    daysBefore.push(subDays(firstDay, extraBeforeDays--))
  }

  while (extraAfterDays > 0) {
    daysAfter.push(addDays(lastDay, extraAfterDays--))
  }

  return [
    ...daysBefore,
    ...eachDay(startOfMonth(date), endOfMonth(date)),
    ...daysAfter,
  ]
}

type ReminderData = {
  anchorEl: Object,
  date: Date,
}

const Month = () => {
  const classes = useStyles()
  // TODO: I should use i18n here
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [reminderData: ReminderData, setReminderData] = React.useState<ReminderData | null>(null)

  function showReminder(target, date) {
    !reminderData && setReminderData({
      anchorEl: target,
      date
    })
  }

  function closeReminder() {
    setReminderData(null)
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom className={classes.header}>
        {format(Date.now(), 'MMM YYYY')}
      </Typography>
      <Grid container spacing={0} justify="center" className={classes.borderlessContainer}>
        {dayNames.map(dayName =>
          <Grid item className={classes.dayName} key={dayName}>
            <Typography variant="h6" component="h2">
              {dayName}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={0} justify="center" className={classes.container}>
        {getDays(Date.now()).map(day =>
          <Day date={day} key={day.getTime()} showReminder={showReminder} />
        )}
      </Grid>
      <ReminderForm handleClose={closeReminder} {...reminderData} />
    </>
  )
}

export default Month
