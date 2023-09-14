import React from 'react'

const AuthLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex flex-row justify-center items-center h-screen'>
      { children }
    </div>
  )
}

export default AuthLayout;