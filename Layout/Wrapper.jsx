import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({children}) => {
  return (
    <>
      <Navbar/>
      {children}
      {/* Footer will be here */}
    </>
  )
}

export default Wrapper
