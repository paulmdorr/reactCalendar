// @flow
import React, { useState } from 'react'
import { Popover, TextField, Button, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { StateConsumer, SAVE_REMINDER } from '../App'

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
  const [reminderText, setReminderText] = useState()

  const handleSave = dispatch => {
    dispatch({
      type: SAVE_REMINDER,
      id: date.getTime(),
      reminder: reminderText,
    })
    handleClose()
  }

  const popoverProps = {
    id,
    open: isOpen,
    anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: 'center',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'center',
      horizontal: 'right',
    },
    classes: {
      paper: classes.paper,
    },
  }

  const textFieldProps = {
    id: 'reminder',
    placeholder: 'Write a reminder',
    autoFocus: true,
    className: classes.textField,
    onChange: (event) => setReminderText(event.target.value),
    inputProps: { maxLength: 30 },
  }

  const buttonProps = {
    color: 'primary',
    variant: 'contained',
    className: classes.button,
  }

  return (
    <StateConsumer>
      {({ dispatch }) => (
        <Popover {...popoverProps} >
          <TextField {...textFieldProps} />
          <Typography className={classes.date}>
            Date: {date && format(date, 'MMM DD, YYYY')}
          </Typography>
          <Box className={classes.box}>
            <Button {...buttonProps} onClick={() => handleSave(dispatch)}>
              Save
            </Button>
          </Box>
        </Popover>
      )}
    </StateConsumer>
  )
}

export default ReminderForm
