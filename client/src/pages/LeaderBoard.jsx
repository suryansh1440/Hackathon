import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { TfiCrown } from 'react-icons/tfi';
import { FiRefreshCw, FiUser, FiAward } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await Axios.get('/api/user/leaderboard');
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchData();
    };

    const handleProfileClick = (userId) => {
        navigate(`/showProfile?id=${userId}`);
    };

    const getRankColor = (index) => {
        if (index === 0) return 'from-yellow-400 via-yellow-300 to-yellow-200';
        if (index === 1) return 'from-gray-300 via-gray-200 to-gray-100';
        if (index === 2) return 'from-amber-500 via-amber-400 to-amber-300';
        return 'from-blue-50 to-white';
    };

    const getRankBadge = (index) => {
        if (index === 0) return 'bg-yellow-400 text-white';
        if (index === 1) return 'bg-gray-400 text-white';
        if (index === 2) return 'bg-amber-500 text-white';
        return 'bg-blue-100 text-blue-800';
    };

    const truncateName = (name) => {
        return name.length > 10 ? `${name.substring(0, 10)}...` : name;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4 flex items-center justify-center gap-3">
                        <TfiCrown className="text-yellow-400 animate-bounce" />
                        Leaderboard
                        <TfiCrown className="text-yellow-400 animate-bounce delay-75" />
                    </h1>
                    <button
                        onClick={handleRefresh}
                        disabled={loading || isRefreshing}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                    >
                        <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh Leaderboard
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl backdrop-blur-lg bg-opacity-90">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-6">
                        <div className="grid grid-cols-4 text-white font-bold text-lg">
                            <span className="flex items-center gap-2">
                                <FiAward className="w-5 h-5" />
                                Rank
                            </span>
                            <span>Name</span>
                            <span className="text-right">Score</span>
                            <span className="text-right">Profile</span>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(5)].map((_, index) => (
                                <div key={index} className="p-6 animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                                </div>
                            ))
                        ) : data.length > 0 ? (
                            data.map((user, index) => (
                                <div
                                    key={user._id}
                                    className={`group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                                        index < 3 ? 'bg-gradient-to-r' : ''
                                    } ${getRankColor(index)}`}
                                >
                                    <div className="grid grid-cols-4 items-center p-6">
                                        <div className="flex items-center space-x-4">
                                            <span className={`font-bold text-lg ${index < 3 ? 'text-white' : 'text-gray-700'}`}>
                                                #{index + 1}
                                            </span>
                                            {index < 3 && (
                                                <div className={`w-10 h-10 rounded-full ${getRankBadge(index)} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                                    <TfiCrown className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <span className={`font-medium text-lg ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                                            <span className="hidden lg:inline">{user.name}</span>
                                            <span className="lg:hidden">{truncateName(user.name)}</span>
                                        </span>
                                        <span className={`text-right font-bold text-xl ${index < 3 ? 'text-white' : 'text-green-600'}`}>
                                            {user.correctAnswer} Points
                                        </span>
                                        <div className="text-right">
                                            <button
                                                onClick={() => handleProfileClick(user._id)}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                                                title="View Profile"
                                            >
                                                <FiUser className={`w-6 h-6 ${index < 3 ? 'text-white' : 'text-indigo-600'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="text-6xl mb-4">🏆</div>
                                <p className="text-gray-600 text-lg font-medium">No scores available yet. Be the first to climb the ranks!</p>
                            </div>
                        )}
                    </div>
                </div>

                {!loading && data.length > 0 && (
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md">
                            <span className="text-sm text-gray-600">
                                Last updated: {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderBoard;