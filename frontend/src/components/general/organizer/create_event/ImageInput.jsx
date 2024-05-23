import React from 'react';
import { coverImageAtom, profileImageAtom } from '../../../../store/atoms/organizerAtom';
import { useRecoilState } from 'recoil';



function ImageInput({ label , type}) {
    const [profile, setProfile] = useRecoilState(profileImageAtom)
    const [cover, setCover] = useRecoilState(coverImageAtom)


    const loadFile = (event ) => {
        const input = event.target;
        const file = input.files[0];
       
        
        if (type === "profile") {
            setProfile(file)
            
        }else if(type === "cover"){
            setCover(file)
        }
      
        const output = document.getElementById('preview_img');

        output.src = URL.createObjectURL(event.target.files[0]);

        output.onload = () => {
            URL.revokeObjectURL(output.src); // free memory
        };
    };


    return (
        <div className='text-center mt-10'>
            <span className='text-md font-bold text-gray-500'>{label}</span>
            <div className="flex justify-center items-center space-x-6 my-4">
                <div className="shrink-0">
                    <img id="preview_img" className="h-16 w-16 object-cover rounded-full" src="https://res.cloudinary.com/daygfelat/image/upload/default_icon_twt_by_me_bp1qpu.jpg" alt="Current profile photo" />
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="file" onChange={loadFile} className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "/>
                </label>
            </div>
        </div>

    );
}

export default ImageInput;
