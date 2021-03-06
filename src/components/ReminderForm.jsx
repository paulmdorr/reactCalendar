// @flow
import React, { useState } from 'react'
import { Popover, TextField, Button, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format, parse } from 'date-fns'
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
    margin: '17px 10px 0 0',
    width: '100px',
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
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    cursor: 'pointer',
    display: 'inline-block',
    marginTop: '17px',
    padding: '5px',
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
  data?: Object,
}

const ReminderForm = ({ anchorEl, handleClose, date, data }: Props) => {
  // Component state
  const [reminderText, setReminderText] = useState(data ? data.text : '')
  const [currentColor, setCurrentColor] = useState(data ? data.color : '#ffd6b2')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [time, setTime] = useState(data ? data.time : '07:30')
  const [currentDate, setCurrentDate] = useState<string>('')

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
    const newDate = parse(currentDate)

    dispatch({
      type: SAVE_REMINDER,
      id: newDate.getTime(),
      prevId: data ? data.date.getTime() : newDate.getTime(),
      reminder: {
        id: data ? data.id : uuid(),
        text: reminderText,
        date: newDate,
        color: currentColor,
        time: time,
      }
    })
    handleClose()
  }

  const resetPopover = () => {
    setReminderText(data ? data.text : '')
    setCurrentColor(data ? data.color : '#d4c4fb')
    setTime(data ? data.time : '07:30')
    setCurrentDate(format(date, 'YYYY-MM-DD'))
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
    onEnter: resetPopover,
  }

  const colorPopoverProps = {
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
    classes: {
      paper: classes.paper,
    },
    color: currentColor,
    onClose: handleClose,
  }

  const reminderTextFieldProps = {
    id: 'reminder',
    placeholder: 'Write a reminder',
    autoFocus: true,
    className: classes.textField,
    onChange: (event) => setReminderText(event.target.value),
    inputProps: { maxLength: 30 },
    value: reminderText,
  }

  const timeTextFieldProps = {
    id: 'time',
    type: 'time',
    className: classes.time,
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: 300,
    },
    onChange: (event) => setTime(event.target.value),
    value: time,
  }

  const dateTextFieldProps = {
    id: 'date',
    type: 'date',
    className: classes.date,
    InputLabelProps: {
      shrink: true,
    },
    onChange: (event) => setCurrentDate(event.target.value),
    value: currentDate,
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
          <TextField {...dateTextFieldProps} />
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
