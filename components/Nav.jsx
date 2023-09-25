"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
const Nav = () => {
    const {data: session} = useSession();
    //const isUserLoggedIn = true
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggledropdown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    },[])
  return (
    <nav className='flex-between w-full mb-13 pt-5 px-10'>
        <Link href="/" className='flex gap-2 flex-center z-10'>
            <Image 
                src={"/assets/images/logo.svg"}
                alt='Promptopia Logo'
                width={30}
                height={30}
                className='object-contain'
            />
            <p className='logo_text'>Promptopia</p>
        </Link>
        <div className='sm:flex hidden z-10'>
            {session?.user  ? (
                <div className=' flex gap-3 md:gap-5'>
                    <Link href={"create-prompt"}
                    className='black_btn'>
                        Create Post
                    </Link>
                    <button type='button' onClick={signOut} 
                        className='outline_btn'>
                            sign out
                    </button>
                    <Link href={"/profile"}>
                        <Image src={session?.user.image}
                        width={30}
                        height={30}
                        className='rounded-full'
                        />
                    </Link>
                </div>
            ):(
                <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'>
                                    Sign In
                                </button>
                        ))
                    }
                </>
            )} 
        </div>
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image 
                        src={session?.user.image}
                        alt='Promptopia Logo'
                        width={37}
                        height={37}
                        className='object-contain'
                        onClick={() => {setToggledropdown((prev) => !prev)}}
                    />
                    {
                        toggleDropdown &&
                        <div className='dropdown'>
                            <Link 
                                href={"/profile"}
                                className='dropdown_link'
                                onClick={() => setToggledropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link href={"create-prompt"}
                                className='dropdown_link'
                                onClick={() => setToggledropdown(false)}
                            >
                                Create Post
                            </Link>
                            <button type='button'                                 
                                onClick={() => {setToggledropdown(false); signOut();}}
                                className='dropdown_link'
                            >
                                Sign Out
                            </button>
                    </div>   
                    }
                </div>
            ): (
                <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'>
                                    Sign In
                                </button>
                        ))
                    }
                </>
            )}
        </div>
    </nav>
    )
}

export default Nav;