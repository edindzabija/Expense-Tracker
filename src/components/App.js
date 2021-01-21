import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'
import Dashboard from './Dashboard'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
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
            <PrivateRoute path='/' exact component={Dashboard} />
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
