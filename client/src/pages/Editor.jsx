import axios from 'axios'
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'

const Editor = () => {
    const {id} = useParams()
    const [website,setWebsite] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const handleGetWebsite = async()=>{
            try {
                setLoading(true)
                setError("")
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`,{withCredentials:true})
                setWebsite(result.data)
            } catch (error) {
                console.log(error)
                setError(error?.response?.data?.message || "Unable to load website")
            } finally {
                setLoading(false)
            }
        }
        handleGetWebsite()
    },[id])

    const openPreview = () => {
      const preview = window.open("", "_blank")
      if (preview) {
        preview.document.open()
        preview.document.write(website?.latestCode || "")
        preview.document.close()
      }
    }

  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='px-4 md:px-6 h-16 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4 min-w-0'>
            <button onClick={()=>navigate("/dashboard")} className='p-2 rounded-lg hover:bg-white/10 transition'>
              <ArrowLeft size={16} />
            </button>
            <div className='min-w-0'>
              <h1 className='text-sm md:text-base font-semibold truncate'>{website?.title || "Editor"}</h1>
              <p className='text-xs text-zinc-500 truncate'>Generated website preview</p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={()=>window.location.reload()}
              className='h-9 w-9 rounded-lg border border-white/10 hover:bg-white/10 transition flex items-center justify-center'
              title='Refresh'
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={openPreview}
              disabled={!website?.latestCode}
              className='h-9 w-9 rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition flex items-center justify-center'
              title='Open preview'
            >
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='min-h-[calc(100vh-64px)] flex items-center justify-center px-6'>
          <motion.div
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            className='text-center'
          >
            <div className='mx-auto mb-4 h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin' />
            <p className='text-sm text-zinc-400'>Loading website...</p>
          </motion.div>
        </div>
      ) : error ? (
        <div className='min-h-[calc(100vh-64px)] flex items-center justify-center px-6'>
          <div className='max-w-md text-center'>
            <h2 className='text-xl font-semibold mb-2'>Website not available</h2>
            <p className='text-sm text-zinc-400 mb-6'>{error}</p>
            <button onClick={()=>navigate("/dashboard")} className='px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold'>
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className='h-[calc(100vh-64px)] bg-zinc-950'>
          <iframe
            title={website?.title || "Generated website"}
            srcDoc={website?.latestCode || ""}
            className='h-full w-full bg-white'
          />
        </div>
      )}
    </div>
  )
}

export default Editor
