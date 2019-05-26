// @flow
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { isThisMonth } from 'date-fns'

const useStyles = makeStyles({
  paper: {
    border: '1px solid #dadce0',
    borderRight: 'none',
    borderBottom: 'none',
    color: '#70757a',
    height: '200px',
    padding: '10px',
    textAlign: 'center',
    '& h2': {
      fontSize: '14px',
    }
  },
  item: {
    width: '14.28%',
  },
  disabled: {
    color: '#dadce0',
  },
  enabled: {
    color: '#70757a',
  }
})

type Props = {
  date: Date,
}

const Day = ({ date }: Props) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.item}>
      <Paper className={classes.paper} square elevation={0}>
        <h2 className={!isThisMonth(date) ? classes.disabled : classes.enabled}>
          {date.getDate()}
        </h2>
      </Paper>
    </Grid>
  )
}

export default Day
