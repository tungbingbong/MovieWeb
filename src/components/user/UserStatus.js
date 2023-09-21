import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/context/AuthContext';

const UserStatus = ({ onClick, className }) => {
    const userInfo = useAuth();
    const navigate = useNavigate();

    return (
        <div className={className}>
            {userInfo ? (
                <span className="text-white">
                    Welcome
                    <button
                        onClick={() => navigate('/account/general')}
                        className="text-secondary hover:underline ml-2"
                    >
                        {userInfo.displayName}
                    </button>
                </span>
            ) : (
                <div className="flex flex-row gap-5 items-center justify-between">
                    <span className="text-white">Anonymous</span>
                    <button className="w-[30px] h-[30px] rounded-full hover:scale-150 transition-all" onClick={onClick}>
                        <img className="pointer-events-none" alt="" src="/default_avatar.png" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserStatus;
