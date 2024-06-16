'use client'

import { FC, FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form/index'
import { IPost } from './interfaces'

const CreatePost: FC = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [submitting, setIsSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<IPost>({ prompt: '', tag: '' })

    const createPost = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log('post', post)
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id ?? null,
                    tag: post.tag,
                }),
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
        ></Form>
    )
}

export default CreatePost
