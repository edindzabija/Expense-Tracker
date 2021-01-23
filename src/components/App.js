import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import UpdateProfileScreen from '../screens/UpdateProfileScreen'
import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute
            path='/update-profile'
            component={UpdateProfileScreen}
          />
          <Route path='/signup' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/forgot-password' component={ResetPasswordScreen} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
