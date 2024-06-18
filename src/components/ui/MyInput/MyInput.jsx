import React from 'react'
import { Input } from 'antd'

import classes from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => {
  return <Input ref={ref} className={classes.myInput} {...props} />
})
MyInput.displayName = 'MyInput'

export default MyInput
