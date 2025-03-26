import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PiUserCircleThin } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import UserAvatarEdit from '../components/UserAvatarEdit';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast  from 'react-hot-toast';
import { useEffect } from 'react';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    })

    useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        })
    }, [user])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummeryApi.updateUserDetails,
                data: {
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                }
            })
            if(response.data.success) {
                console.log(response.data);
                toast.success("Profile Updated Successfully")
                // Preserve the avatar while updating other user details
                dispatch(setUserDetails({
                    ...user,                // Preserve existing user data
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile
                }))
            } else {
                toast.error(response.data.message || 'Failed to update profile')
            }
        } catch(error) {
            console.error('Update error:', error)
            toast.error(error.response?.data?.message || 'Error updating profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-3xl mx-auto lg:p-6'>
            <div className='bg-white rounded-lg lg:shadow-md lg:p-8 p-1'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='w-32 h-32 bg-orange-100 rounded-full flex justify-center items-center drop-shadow-sm overflow-hidden mb-4'>
                        {user.avatar ? 
                            <img src={user.avatar} alt={user.name} className='w-full h-full object-cover'/> 
                            : <PiUserCircleThin size={100} />
                        }
                    </div>
                    <button 
                        onClick={() => setEdit(!edit)} 
                        className='flex items-center gap-2 border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-all duration-300'
                    >
                        <FiEdit2 size={16} />
                        Edit Profile Picture
                    </button>
                </div>

                {edit && <UserAvatarEdit setEdit={setEdit}/>}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-gray-700 font-medium mb-2'>Name</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={user.name}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 font-medium mb-2'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 font-medium mb-2'>Mobile</label>
                            <input
                                type='tel'
                                name='mobile'
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder={user.mobile}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
                            />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type='submit'
                            disabled={loading}
                            className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50'
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
