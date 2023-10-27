import React from 'react'
import Layout from './Layout'

const ErrorPage = () => {
  return (
    <Layout>
        <div className=' w-full min-h-[90vh] flex flex-col items-center justify-center text-red-800 font-bold text-4xl gap-6'>
                *** OPPS Page Not Found ***
        </div>
    </Layout>
  )
}

export default ErrorPage
