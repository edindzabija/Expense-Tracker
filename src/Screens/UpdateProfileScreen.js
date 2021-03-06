import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Budget App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const UpdateProfileScreen = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword, updateName } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match")
    }

    const promises = []

    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    if (nameRef.current.value) {
      promises.push(updateName(nameRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })

    setLoading(false)
  }
  const classes = useStyles()
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Update Profile
        </Typography>

        {error && <Alert severity='error'>{error}</Alert>}

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            required
            id='displayName'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Display Name'
            name='displayName'
            autoFocus
            inputRef={nameRef}
            defaultValue={
              currentUser.displayName ? currentUser.displayName : ''
            }
          />
          <TextField
            required
            id='email'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            inputRef={emailRef}
            defaultValue={currentUser.email}
          />
          <TextField
            id='password'
            variant='outlined'
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            inputRef={passwordRef}
            helperText='Leave blank to keep old password'
          />
          <TextField
            id='password-confirm'
            variant='outlined'
            margin='normal'
            fullWidth
            name='password-confirm'
            label='Confirm Password'
            type='password'
            autoComplete='current-password'
            inputRef={passwordConfirmRef}
            helperText='Leave blank to keep old password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Update
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/' variant='body2'>
                Cancel
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default UpdateProfileScreen
