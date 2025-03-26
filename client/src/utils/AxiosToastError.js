import toast from 'react-hot-toast';

const AxiosToastError = (error) => {
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "An unexpected error occurred";
    toast.error(errorMessage);
    console.error("Error:", error);
};

export default AxiosToastError;
