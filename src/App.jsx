import React from 'react'
import Helmet from 'react-helmet'
import { startOfMonth, endOfMonth, eachDay, subDays, addDays } from 'date-fns'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  item: {
    width: '14%',
  },
})

function getDays(date) {
  const firstDay = startOfMonth(date)
  let extraBeforeDays = firstDay.getDay()
  let daysBefore = []
  const lastDay = endOfMonth(date)
  let extraAfterDays = 6 - lastDay.getDay()
  let daysAfter = []

  while(extraBeforeDays > 0) {
    daysBefore.push(subDays(firstDay, extraBeforeDays--))
  }

  while(extraAfterDays > 0) {
    daysAfter.push(addDays(lastDay, extraAfterDays--))
  }

  return [
    ...daysBefore,
    ...eachDay(startOfMonth(date), endOfMonth(date)),
    ...daysAfter,
  ]
}

const App = ({classes}) => (
  <React.Fragment>
    <Helmet>
      <title>React Calendar - Home Page</title>
    </Helmet>
    <Grid container spacing={3}>
      {getDays(Date.now()).map(day =>
        <Grid item className={classes.item}>
          <Paper className={classes.paper}>
            {day.getDate()}
          </Paper>
        </Grid>
      )}
    </Grid>
  </React.Fragment>
)

export default withStyles(styles)(App)