// @flow
import React from 'react'
import { Popover, TextField, Button, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '20px',
  },
  textField: {
    width: '300px',
  },
  button: {
    margin: theme.spacing(1),
  },
  box: {
    textAlign: 'right',
  },
  date: {
    marginTop: '20px',
  }
}))

type Props = {
  anchorEl: Object,
  handleClose: Function,
  date: Date,
}

const ReminderForm = ({ anchorEl, handleClose, date }: Props) => {
  const isOpen = !!anchorEl
  const id = isOpen ? 'simple-popover' : null
  const classes = useStyles()

  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      classes={{
        paper: classes.paper,
      }}
    >
      <TextField
        id="reminder"
        placeholder="Write a reminder"
        autoFocus
        className={classes.textField}
      />
      <Typography className={classes.date}>
        Date: {date && format(date, 'MMM DD, YYYY')}
      </Typography>
      <Box className={classes.box}>
        <Button color="primary" variant="contained" className={classes.button}>
          Save
        </Button>
      </Box>
    </Popover>
  )
}

export default ReminderForm
