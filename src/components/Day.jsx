// @flow
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isThisMonth, isToday } from 'date-fns'
import classnames from 'classnames'

const useStyles = makeStyles({
  item: {
    borderTop: '1px solid #dadce0',
    borderLeft: '1px solid #dadce0',
    color: '#70757a',
    padding: '10px',
    textAlign: 'center',
    '& h3': {
      fontSize: '14px',
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
})

type Props = {
  date: Date,
  showReminder: Function,
}

const Day = ({ date, showReminder }: Props) => {
  const classes = useStyles()
  const isEnabled = !isThisMonth(date) ? classes.disabled : classes.enabled
  const itemClasses = classnames(classes.item, isToday(date) && classes.currentDay)

  function handleClick(event) {
    showReminder(event.currentTarget, date)
  }

  return (
    <Grid item className={itemClasses} onClick={handleClick}>
      <Typography variant="h6" component="h3" className={isEnabled}>
        {date.getDate()}
      </Typography>
    </Grid>
  )
}

export default Day
