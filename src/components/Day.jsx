// @flow
import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { isThisMonth } from 'date-fns'

const useStyles = makeStyles({
  paper: {
    borderTop: '1px solid #dadce0',
    borderLeft: '1px solid #dadce0',
    color: '#70757a',
    height: '200px',
    padding: '10px',
    textAlign: 'center',
    '& h3': {
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
        <Typography variant="h6" component="h3" className={!isThisMonth(date) ? classes.disabled : classes.enabled}>
          {date.getDate()}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Day
