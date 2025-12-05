import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {

    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {
        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li 
                    key={i} 
                    onClick={() => setPageNumber(i)} 
                    className={`
                        w-[35px] h-[35px] rounded-full flex justify-center items-center cursor-pointer text-sm font-semibold transition-all duration-300 border
                        ${pageNumber === i 
                            ? 'bg-[#059473] text-white border-[#059473] shadow-md shadow-[#059473]/30' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-[#059473] hover:text-white hover:border-[#059473] hover:shadow-lg'}
                    `}>
                    {i}
                </li>
            )
        }
        return btns
    }

    return (
        <ul className='flex gap-2 items-center'>
            {
                pageNumber > 1 && 
                <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[35px] h-[35px] rounded-full flex justify-center items-center bg-white text-slate-600 border border-slate-200 cursor-pointer hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all duration-300 shadow-sm'>
                    <MdOutlineKeyboardDoubleArrowLeft size={20} />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && 
                <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[35px] h-[35px] rounded-full flex justify-center items-center bg-white text-slate-600 border border-slate-200 cursor-pointer hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all duration-300 shadow-sm'>
                    <MdOutlineKeyboardDoubleArrowRight size={20} />
                </li>
            }
        </ul>
    )
};

export default Pagination;