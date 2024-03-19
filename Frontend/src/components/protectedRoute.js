import { Navigate } from 'react-router-dom'

const ProtectedRoute=(props)=> {
  return props.condition ? <>{props.children}</> : <Navigate to={props.redirectTo} replace />
}

export default ProtectedRoute