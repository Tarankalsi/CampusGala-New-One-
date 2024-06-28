import React, { useState } from 'react'
import ImageInput from './ImageInput'
import { useRecoilState, useRecoilValue } from 'recoil'
import { coverImageAtom, coverImageUrlAtom, profileImageAtom, profileImageUrlAtom } from '../../../../store/atoms/organizerAtom'
import axios from 'axios'
import Spinner from '../../../ui/Spinner'
import { BACKEND_URL } from '../../../../../config'

function ImageUpload() {
    const profile = useRecoilValue(profileImageAtom)
    const cover = useRecoilValue(coverImageAtom)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const [profileUrl, setProfileUrl] = useRecoilState(profileImageUrlAtom)
    const [coverUrl, setCoverUrl] = useRecoilState(coverImageUrlAtom)

    const [error, setError] = useState("")

    const uploadCall = async () => {


        if (!profile || !cover) {
            setError("Please select both profile and cover images.")
            return;
        }
        setLoading(true)
        setError("");
        const formData = new FormData();
        formData.append("avatar", profile);
        formData.append("coverImage", cover);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/organizer/create-event/upload-file`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('organizerToken')}`
                },
            })
            setCoverUrl(response.data.coverImage)
            setProfileUrl(response.data.avatar)
            
            if (response.data.success === true) {
                setSuccess(true)
            }

        } catch (error) {
            setError(error.response.data.message)
            console.error("Upload Failed", error.response.data.message)
        } finally {
            setLoading(false)
        }
        console.log(coverUrl)
        console.log(profileUrl)
    }

    return (
        <div>
            <div className='text-center my-14 '>
                <span className='font-extrabold text-2xl text-secondary'>Upload Images</span>
            </div>
            <div className='text-center'>
                {success && <span className='text-sm tex-center  text-green-600 ' >Uploaded Successfully</span>}
                {error && <span className='text-sm text-center  text-red-600 '>{error}</span>}
            </div>

            <ImageInput label={"Profile Image"} type={"profile"} />
            <ImageInput label={"Cover Image"} type={"cover"} />
            <div className='flex justify-center my-8'>
                <button
                    onClick={uploadCall}
                    className='bg-primary px-6 py-2 text-white rounded font-bold text-center hover:bg-pink-600'
                >
                    {loading ? <Spinner /> : "Upload"}
                </button>
            </div>

        </div>
    )
}

export default ImageUpload
