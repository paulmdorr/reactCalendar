// @flow
import React from 'react'
import { startOfMonth, endOfMonth, eachDay, subDays, addDays } from 'date-fns'
import Grid from '@material-ui/core/Grid'
import Day from './Day'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    fontFamily: 'Roboto',
    borderBottom: '1px solid #dadce0',
    borderRight: '1px solid #dadce0',
    margin: '0 auto',
    width: '80%',
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

const Month = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={0} justify="center" className={classes.container}>
      {getDays(Date.now()).map(day =>
        <Day date={day} key={day.getTime()}/>
      )}
    </Grid>
  )
}

export default Month
