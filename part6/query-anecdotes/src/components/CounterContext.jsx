import { createContext, useContext, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'clear':
      return null
    default:
      return state
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(reducer, null)
  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export const useNotificationValue = ()=>{
    const notificationAndDispatch = useContext(CounterContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = ()=>{
    const notificationAndDispatch = useContext(CounterContext)
    return notificationAndDispatch[1]
}
export default CounterContext
