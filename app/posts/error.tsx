'use client'

import React from 'react'
import { useEffect } from 'react'

interface IError {
    error: string
    reset: () => void
}

const Error = ({ error, reset }: IError) => {
    useEffect(() => {
        // smth
        console.log(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong: {error}</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default Error
