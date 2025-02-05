"use client"
import React from 'react';
import Button from './Forms/Button';
import { Fade, Zoom } from 'react-awesome-reveal';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className='my-[15em] px-4 md:px-8 lg:px-16'>
            <Zoom>
                <h1 className='text-4xl md:text-5xl lg:text-[5em] text-primary text-center font-bold leading-tight'>
                BlockerHeader Wallet
                </h1>
                <p className='text-white text-center text-md md:text-2xl lg:text-2xl mt-4 max-w-4xl mx-auto'>
                BlockerHeader Wallet provides a simple and secure way to connect to blockchain-based applications. You are always in control when interacting on the new decentralized web.
                </p>
            </Zoom>
            <Fade>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-5">
                    <Link href="/create-wallet"><Button label="Create Wallet" size='lg' /></Link>
                    <Button label="Import Wallet" size='lg' />
                </div>
            </Fade>
        </div>
    );
};

export default Hero;