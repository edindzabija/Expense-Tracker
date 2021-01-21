import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'
import Dashboard from './Dashboard'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Flex
      w='full'
      minHeight='100vh'
      align='center'
      justifyContent='center'
      alignContent='center'
      flexDir='column'
    >
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </Flex>
  )
}

export default App
