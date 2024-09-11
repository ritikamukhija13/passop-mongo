import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords);
        setpasswordArray(passwords)
        




    }

    useEffect(() => {
        getPasswords();



    }, [])

    const showPassword = () => {
        //   alert("show the password")
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
        else {
            ref.current.src = "icons/hidden.png";
            passwordRef.current.type = "text";
        }

    }
    const savePassword = async() => {
        // console.log(form)
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/",{method: "DELETE", headers: {"Content-type":"application/json"},
                body: JSON.stringify({id: form.id})})
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/",
                {method: "POST", headers: {"Content-type":"application/json"},
                body: JSON.stringify({...form, id: uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            toast('Error: Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }

        // console.log([...passwordArray, { ...form,id:uuidv4()}])
    }
    const deletePassword = async(id) => {
        console.log("deleting password with id ", id);
        let c = confirm("do you want to delete this password?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res=await fetch("http://localhost:3000/",{method: "DELETE", headers: {"Content-type":"application/json"},
                body: JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });

        }



    }
    const editPassword = (id) => {
        // console.log("edit password with id ", id);
        setform({...passwordArray.filter(item => item.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))


    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)


    }



    return (
        <>
            {/* https://fkhadra.github.io/react-toastify/introduction/ */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180
         transform bg-green-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">

            </div>
            <div className=" md:bg-slate-100 md:mycontainer p-2 md:p-0 min-h-[84.5vh]">
                <h1 className='text-3xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    Pass

                    <span className='text-green-500'>OP/&gt;</span>


                </h1>
                <p className='text-green-900 text-lg text-center'>your own password manager</p>
                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} id="site" onChange={handleChange} placeholder='enter website url' type="text" className='rounded-xl border-[2px] border-green-800 px-4 py-1 w-[50vw]' name="site" />
                    <div className="flex flex-col md:flex-row gap-3">
                        <input value={form.username} onChange={handleChange} id="username" placeholder='enter username' type="text" className='rounded-xl w-full  border-[2px] border-green-800 px-4 py-1' name="username" />
                        <div className="relative w-full">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} id="password" placeholder='enter password' type="password" className='rounded-xl  border-[2px] border-green-800 px-6 py-1 w-full' name="password" />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={18} src="icons/eye.png" alt="" />
                            </span>

                        </div>


                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-4 py-3 w-fit hover:bg-green-600 gap-2'> <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-4 text-xl px-2'>Your passwords</h2>
                    {passwordArray.length === 0 && <div className='px-2'>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mx-10">
                        <thead className=' bg-green-500'>
                            <tr>
                                <th className='text-start py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>

                            </tr>
                        </thead>
                        <tbody className='bg-green-100 '>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} className=''>

                                    <td className='text-start py-2  border border-white'>
                                        <div className='flex items-center'>
                                            <a className='px-3' href={item.site} target="_blank">{item.site}</a>
                                            <img className='cursor-pointer' width={20} height={5} src="/icons/copy.png" alt="copy" onClick={() => {
                                                copyText(item.site)
                                            }} />
                                        </div>
                                    </td>



                                    <td className='text-center py-2  border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span className='px-3'>{item.username}</span>
                                            <img className='cursor-pointer' width={20} height={5} src="/icons/copy.png" alt="copy" onClick={() => { copyText(item.username) }} />

                                        </div>

                                    </td>
                                    <td className='text-center py-2  border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span className='px-3'>{"*".repeat(item.password.length)}</span>
                                            <img className='cursor-pointer' width={20} height={5} src="/icons/copy.png" alt="copy" onClick={() => { copyText(item.password) }} />

                                        </div>

                                    </td>
                                    <td className='flex justify-center text-center py-2  border border-white'>
                                        <span className='cursor-pointer px-2' onClick={() => { editPassword(item.id) }}>
                                            <img width={23} height={23} src="/icons/edit.png" alt="" />
                                        </span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>



                                    </td>
                                </tr>

                            })}


                        </tbody>
                    </table>}
                </div>

            </div>

        </>

    )
}

export default Manager