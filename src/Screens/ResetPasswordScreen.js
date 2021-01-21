import React, { useRef, useState } from 'react'
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

import RotateLeftIcon from '@material-ui/icons/RotateLeft'
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

const ResetPasswordScreen = () => {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions.')
    } catch {
      setError('Failed to Reset Password')
    }

    setLoading(false)
  }

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RotateLeftIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Password Reset
        </Typography>

        {error && (
          <Alert severity='error' my={3}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity='success' my={3}>
            {message}
          </Alert>
        )}

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            inputRef={emailRef}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Reset
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/login' variant='body2'>
                Have an account? Log In
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
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

export default ResetPasswordScreen
