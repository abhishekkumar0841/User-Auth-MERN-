import React from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { user} = useSelector(state=> state.auth)

  return (
    <Layout>
        <div className=' w-full min-h-[90vh] flex flex-col items-center justify-center text-white text-2xl sm:text-4xl gap-6'>
            <h1 className=' text-center'>User Profile</h1>
            <div className=' flex items-center justify-center flex-col gap-4'>
              <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullName}`} alt="User Image" className=' rounded-full w-32 sm:w-52' />
              <h2 className=' font-semibold'>Name: <span className=' text-yellow-400'>{user?.fullName}</span></h2>
              <h3 className=' font-semibold'>Email: <span className=' text-yellow-400'>{user?.email}</span></h3>
              <h3 className=' font-semibold'>Bio: <span className=' text-yellow-400'>{user?.bio ? user?.bio : "Vela Hu Mai😒😒"}</span></h3>
              <h3 className=' font-semibold'>Role: <span className=' text-yellow-400'>{user?.role}</span></h3>
            </div>
        </div>
    </Layout>
  )
}

export default Profile
