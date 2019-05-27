// @flow
import React, { useState } from 'react'
import { Popover, TextField, Button, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { StateConsumer } from '../App'
import { SAVE_REMINDER } from '../reducers'
import { BlockPicker } from 'react-color'

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
    textAlign: 'right',
  },
  date: {
    display: 'inline-block',
    marginTop: '20px',
    marginRight: '10px',
  },
  color: {
    width: '14px',
    height: '14px',
    borderRadius: '2px',
    background: ({ currentColor }) => `rgba(${ currentColor.r }, ${ currentColor.g }, ${ currentColor.b }, ${ currentColor.a })`,
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
}))

type Props = {
  anchorEl: Object,
  handleClose: Function,
  date: Date,
}

const ReminderForm = ({ anchorEl, handleClose, date }: Props) => {
  const isOpen = !!anchorEl
  const id = isOpen ? 'reminder-popover' : null
  const [reminderText, setReminderText] = useState()
  const [currentColor, setCurrentColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  })
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const classes = useStyles({ currentColor })

  const handleOpenColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker )
  }

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false)
  }

  const handleChangeColor = (color) => {
    setCurrentColor(color.rgb)
    setDisplayColorPicker(false)
  }

  const handleSave = dispatch => {
    dispatch({
      type: SAVE_REMINDER,
      id: date.getTime(),
      reminder: {
        text: reminderText,
        date: date,
        color: currentColor,
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
            {date && format(date, 'MMM DD, YYYY')}
          </Typography>
          <div id="color-popover-button" className={classes.swatch} onClick={handleOpenColorPicker}>
            <div className={classes.color} />
            <Popover className={classes.colorPopover} {...colorPopoverProps}>
              <div className={classes.cover} onClick={handleCloseColorPicker}/>
              <BlockPicker color={currentColor} onChange={handleChangeColor} triangle="hide" />
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
