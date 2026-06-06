import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from 'axios'
import { serverUrl } from "../App";

const Generate = () => {
  const navigate = useNavigate();
  const [prompt,setPrompt] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const handleGenerateWebsite = async()=>{
    if(!prompt.trim()) {
      setError("Describe the website you want to build first.")
      return
    }

    try {
      setLoading(true)
      setError("")
      const res = await axios.post(`${serverUrl}/api/website/generate`,{prompt},{withCredentials:true})
      if(res.data?.websiteId) {
        navigate(`/editor/${res.data.websiteId}`)
      }
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message || "Website generation failed")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 ">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">
              GenWeb<span className="text-zinc-400 ">.ai</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build website with{" "}
            <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Real AI Power
            </span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            This process may take several minutes. GenWeb.ai focuses on quality,
            not shortcuts
          </p>
        </motion.div>
        {/* Prompt */}

        <div className="mb-14 ">
          <h1 className="text-xl font-semibold mb-2">Describe your website</h1>
          <div className="relative">
            <textarea
              onChange={(e)=>setPrompt(e.target.value)}
              value={prompt}
              name=""
              id=""
              placeholder="Describe your website in detail..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-white/20"
            ></textarea>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
        <div className="flex justify-center">
            <motion.button
            onClick={handleGenerateWebsite}
            disabled={loading}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.96}}
            className="px-14 py-4 min-w-60 rounded-2xl font-semibold text-lg bg-white text-black hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? "Generating..." : "Generate Website"}
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
