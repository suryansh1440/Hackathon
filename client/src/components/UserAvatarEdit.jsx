import React, { useState } from 'react'
import { PiUploadSimple } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';  
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from '../store/userSlice';


const UserAvatarEdit = ({setEdit}) => {
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);  
    const dispatch = useDispatch();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        const formData = new FormData();
        formData.append('avatar', file);
        setFormData(formData);

    };
    

    const handleSave = async () => {
        try {
            setLoading(true);   
            const response = await Axios({
                ...SummeryApi.uploadAvatar,
                data: formData,
            });
            if(response.status === 200){
                toast.success('Profile Picture Updated Successfully');
                setEdit(false);
                dispatch(updateUserAvatar(response.data.data));
            } 
        } catch(error) {
            toast.error(error.response?.data?.message || 'Error uploading avatar');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center p-4 z-50'>
            <div className='bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative'>
                <button onClick={() => setEdit(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                    <IoMdClose size={24} />
                </button>

                <h2 className='text-2xl font-bold text-center mb-6'>Edit Profile Picture</h2>

                <div className='flex flex-col items-center gap-6'>
                    <div className='w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50'>
                        {preview ? (
                            <img src={preview} alt="Preview" className='w-full h-full object-cover' />
                        ) : (
                            <div className='text-center p-4'>
                                <PiUploadSimple size={40} className="mx-auto text-gray-400 mb-2" />
                                <p className='text-sm text-gray-500'>Click to upload</p>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        className='hidden'
                        id='avatar'
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className='flex gap-4 w-full'>
                        <label
                            htmlFor='avatar'
                            className='flex-1 bg-orange-500 text-white py-2 rounded-md text-center cursor-pointer hover:bg-orange-600 transition-colors'
                        >
                            Choose File
                        </label>
                        <button disabled={loading} onClick={handleSave} className='flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors'>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserAvatarEdit
