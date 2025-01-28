import React, { ReactNode } from 'react'
import Header from '../header/Header'

interface props{
    children: ReactNode
}

const Wrapper : React.FC<props> = ({children}) => {
  return (
    <div>
    <Header/>
    {children}
    </div>
  )
}

export default Wrapper