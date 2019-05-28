// @flow
import React from 'react'
import { format } from 'date-fns'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Day from './Day'
import ReminderForm from './ReminderForm'
import { StateConsumer } from '../App'

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

type ReminderData = {
  anchorEl: Object,
  date: Date,
}

const Month = () => {
  const classes = useStyles()
  // TODO: I should use i18n here
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [reminderData: ReminderData, setReminderData] = React.useState<ReminderData | null>(null)

  function showReminder(target, date, data) {
    !reminderData && setReminderData({
      anchorEl: target,
      date: data ? data.date : date,
      data,
    })
  }

  function closeReminder() {
    setReminderData(null)
  }

  return (
    <StateConsumer>
      {({ days }) => (
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
            {days.map(day =>
              <Day date={day} key={day.getTime()} showReminder={showReminder} />
            )}
          </Grid>
          <ReminderForm handleClose={closeReminder} {...reminderData} />
        </>
      )}
    </StateConsumer>
  )
}

export default Month
