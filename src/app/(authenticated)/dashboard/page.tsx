import React from 'react'

// Components
import Aside from '@/components/aside/Aside'

type Props = {}

function Dashboard({}: Props) {
  return (
    <>
      <main className='w-full h-full'>
        <Aside />
      </main>
    </>
    
  )
}

export default Dashboard