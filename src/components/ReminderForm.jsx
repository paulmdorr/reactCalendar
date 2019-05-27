// @flow
import React, { useState } from 'react'
import { Popover, TextField, Button, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { v1 as uuid } from 'uuid'
import { StateConsumer } from '../App'
import { SAVE_REMINDER } from '../reducers'
import { GithubPicker } from 'react-color'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '20px',
    maxWidth: '300px',
  },
  textField: {
    width: '300px',
  },
  button: {
    margin: theme.spacing(1),
  },
  box: {
    marginTop: '20px',
    textAlign: 'right',
  },
  date: {
    display: 'inline-block',
    marginTop: '20px',
  },
  time: {
    display: 'inline-block',
    margin: '17px 20px 0',
    width: '100px',
  },
  color: {
    width: '14px',
    height: '14px',
    borderRadius: '2px',
    background: ({ currentColor }) => currentColor,
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
    position: 'relative',
    top: '6px',
  },
  colorPopover: {
    marginLeft: '10px',
  }
}))

type Props = {
  anchorEl: Object,
  handleClose: Function,
  date: Date,
}

const ReminderForm = ({ anchorEl, handleClose, date }: Props) => {
  // Component state
  const [reminderText, setReminderText] = useState('')
  const [currentColor, setCurrentColor] = useState('#ffd6b2')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [time, setTime] = useState('07:30')

  const isOpen = !!anchorEl
  const id = isOpen ? 'reminder-popover' : null
  const classes = useStyles({ currentColor })

  const handleOpenColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker )
  }

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false)
  }

  const handleChangeColor = (color) => {
    setCurrentColor(color.hex)
    setDisplayColorPicker(false)
  }

  const handleSave = dispatch => {
    dispatch({
      type: SAVE_REMINDER,
      id: date.getTime(),
      reminder: {
        id: uuid(),
        text: reminderText,
        date: date,
        color: currentColor,
        time: time,
      }
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

  const colorPopoverProps = {
    ...popoverProps,
    id: 'color-popover',
    anchorEl: document.getElementById('color-popover-button'),
    open: displayColorPicker,
    anchorOrigin: {
      vertical: 'center',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'center',
      horizontal: 'left',
    },
  }

  const reminderTextFieldProps = {
    id: 'reminder',
    placeholder: 'Write a reminder',
    autoFocus: true,
    className: classes.textField,
    onChange: (event) => setReminderText(event.target.value),
    inputProps: { maxLength: 30 },
  }

  const timeTextFieldProps = {
    id: 'time',
    type: 'time',
    defaultValue: '07:30',
    className: classes.time,
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: 300,
    },
    onChange: (event) => setTime(event.target.value),
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
          <TextField {...reminderTextFieldProps} />
          <Typography className={classes.date}>
            {date && format(date, 'MMM DD, YYYY')}
          </Typography>
          <TextField {...timeTextFieldProps} />
          <div id="color-popover-button" className={classes.swatch} onClick={handleOpenColorPicker}>
            <div className={classes.color} />
            <Popover className={classes.colorPopover} {...colorPopoverProps}>
              <div className={classes.cover} onClick={handleCloseColorPicker}/>
              <GithubPicker color={currentColor} onChange={handleChangeColor} triangle="hide" />
            </Popover>
          </div>
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
