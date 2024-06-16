import React from 'react'

export default function PostsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
