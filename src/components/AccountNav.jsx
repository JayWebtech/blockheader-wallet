"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Forms/Button';

const AccountNav = ({createAccount, setOpen}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-2 border-[#333] p-4 rounded-lg sticky top-5 z-[50] backdrop-blur-md bg-black/60">
            <div className="flex justify-between items-center">
                
                <h1 className="text-2xl text-white">
                    <span className='text-primary'>Dashboard</span>
                </h1>
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <div className={`hidden md:flex gap-3 ${isOpen ? "hidden" : "block"}`}>
                    <Button label="Send Transaction" size='sm' onClick={()=>setOpen(true)} />
                    <Button label="Create Account" size='sm' onClick={createAccount}/>
                </div>
            </div>
        </header>
    );
}

export default AccountNav;