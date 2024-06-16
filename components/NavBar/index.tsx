'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { IProvider } from './interfaces'

const NavBar: React.FC = () => {
    const { data: session, status } = useSession()

    const [providers, setProviders] = useState<Record<string, IProvider>>({})
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
    console.log('providers', providers)

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res as Record<string, IProvider>)
        }

        fetchProviders()
    }, [])

    console.log('sessiojn^ ', session?.user)

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.png"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-post" className="black_btn">
                            Create Post
                        </Link>

                        <button
                            type="button"
                            onClick={async () => {
                                await signOut()
                            }}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={
                                    session?.user?.image ??
                                    '/assets/images/logo.png'
                                }
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map(
                                ({ name, id }: IProvider) => (
                                    <button
                                        type="button"
                                        key={name}
                                        onClick={() => {
                                            signIn(id)
                                        }}
                                        className="black_btn"
                                    >
                                        Sign in
                                    </button>
                                )
                            )}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={
                                session?.user.image ??
                                '/assets/images/profile.png'
                            }
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map(provider => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id)
                                    }}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar
