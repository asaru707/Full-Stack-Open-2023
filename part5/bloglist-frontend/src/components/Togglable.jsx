import { forwardRef, useImperativeHandle, useState } from 'react'

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
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
    )
  return (
    <div style={showWhenVisible}>
      {children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  )
})

Togglable.displayName = Togglable
export default Togglable
