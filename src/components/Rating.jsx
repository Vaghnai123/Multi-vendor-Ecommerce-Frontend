import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const MAX_STARS = 5; 

const Rating = ({ ratings }) => {


    const stars = Array.from({ length: MAX_STARS }, (_, index) => {
     
        const starValue = index + 1; 

        let icon = <CiStar />; 
        let colorClass = 'text-slate-600'; 

        if (ratings >= starValue) {
            icon = <FaStar />;
            colorClass = 'text-[#EDBB0E]'; 

        } else if (ratings >= starValue - 0.5) {
            icon = <FaStarHalfAlt />;
            colorClass = 'text-[#EDBB0E]'; 
        }
        
        return (
            <span key={index} className={colorClass}>
                {icon}
            </span>
        );
    });

    return (
        <div className='flex items-center text-sm'>
            {stars}
        </div>
    );
};

export default Rating;