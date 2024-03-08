const Notification = ({ message, type }) => {
  const style = { padding: '15px', color: type === 'error' ? 'red' : 'blue' }
  if (!message) return null
  return <div style={style}>{message}</div>
}

export default Notification
