import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })
  if (!visible)
    return (
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
    )
  return (
    <div style={showWhenVisible}>
      {children}
      <Button className='my-1' variant='danger' onClick={toggleVisibility}>
        cancel
      </Button>
    </div>
  )
})

Togglable.displayName = Togglable
export default Togglable
