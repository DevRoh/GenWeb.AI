import axios from 'axios'
import { ArrowLeft, Clock, ExternalLink, FileCode2, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react' 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'

const Dashboard = () => {
    const {userData} =  useSelector(state=>state.user)
    const navigate = useNavigate()
    const [websites,setWebsites] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    useEffect(()=>{
        const getWebsites = async()=>{
            try {
                setLoading(true)
                setError("")
                const res = await axios.get(`${serverUrl}/api/website/my-websites`,{withCredentials:true})
                setWebsites(res.data || [])
            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.message || "Unable to load websites")
            } finally {
                setLoading(false)
            }
        }

        getWebsites()
    },[])

    const formatDate = (value) => {
        if(!value) return "Recently"
        return new Intl.DateTimeFormat("en", {
            month:"short",
            day:"numeric",
            year:"numeric"
        }).format(new Date(value))
    }

  return (
    <div className='min-h-screen bg-[#050505] text-white'>
        <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                <div className='flex items-center gap-4 '>
                    <button onClick={()=>navigate("/")} className='p-2 rounded-lg hover:bg-white/10 transition'><ArrowLeft size={16} /></button>
                    <h1 className='text-lg font-semibold'>Dashboard</h1>
                </div>
                <button onClick={()=>navigate("/generate")} className='px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition'>
                    + New Website
                </button>
            </div>
        </div>
        <div className='max-w-7xl mx-auto px-6 py-10'>
            <motion.div
            initial={{opacity:0, y:13}}
            animate={{opacity:1,y:0}}
            className='mb-10'
            >
                <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
                <h1 className='text-3xl font-bold'>{userData?.name}</h1>
            </motion.div>

            <div className='flex items-center justify-between gap-4 mb-6'>
                <div>
                    <h2 className='text-xl font-semibold'>Your websites</h2>
                    <p className='text-sm text-zinc-500 mt-1'>{websites.length} saved project{websites.length === 1 ? "" : "s"}</p>
                </div>
            </div>

            {loading ? (
                <div className='min-h-80 flex items-center justify-center text-zinc-400'>
                    <Loader2 size={22} className='animate-spin mr-3' />
                    Loading websites...
                </div>
            ) : error ? (
                <div className='border border-white/10 bg-white/5 rounded-xl p-8 text-center'>
                    <h3 className='font-semibold mb-2'>Could not load websites</h3>
                    <p className='text-sm text-zinc-400'>{error}</p>
                </div>
            ) : websites.length === 0 ? (
                <div className='border border-white/10 bg-white/5 rounded-xl p-10 text-center'>
                    <FileCode2 size={34} className='mx-auto mb-4 text-zinc-500' />
                    <h3 className='text-lg font-semibold mb-2'>No websites yet</h3>
                    <p className='text-sm text-zinc-400 mb-6'>Generate your first website and it will appear here.</p>
                    <button onClick={()=>navigate("/generate")} className='px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition'>
                        New Website
                    </button>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {websites.map((website,index)=>(
                        <motion.div
                        key={website._id}
                        initial={{opacity:0,y:16}}
                        animate={{opacity:1,y:0}}
                        transition={{delay:index * 0.04}}
                        className='rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/[0.07] transition'
                        >
                            <div className='flex items-start justify-between gap-4 mb-8'>
                                <div className='h-11 w-11 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0'>
                                    <FileCode2 size={19} />
                                </div>
                                <span className='px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs border border-emerald-400/20'>
                                    {website.deployed ? "Deployed" : "Draft"}
                                </span>
                            </div>

                            <h3 className='font-semibold mb-2 line-clamp-2 min-h-12'>{website.title}</h3>
                            <div className='flex items-center gap-2 text-xs text-zinc-500 mb-5'>
                                <Clock size={13} />
                                Updated {formatDate(website.updatedAt)}
                            </div>

                            <button
                            onClick={()=>navigate(`/editor/${website._id}`)}
                            className='w-full h-10 rounded-lg bg-white text-black text-sm font-semibold hover:scale-[1.02] transition flex items-center justify-center gap-2'
                            >
                                Open
                                <ExternalLink size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Dashboard
