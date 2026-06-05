import React from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const avatarUrl = userData?.avatar;
  const name = userData?.name;
  const dispatch = useDispatch()

  // const userInitial = userData?.name?.charAt(0)?.toUpperCase() || "U";
  const highlights = [
    "Ai Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  const handleLogout = async()=>{
    try {
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      setOpenProfile(false)
    } catch (error) {
      console.log("Error in Home.jsx",error)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left */}
          <div className="text-lg font-semibold">GenWeb.ai</div>
          {/* Right */}
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer ">
              Pricing
            </div>

            {userData && (
              <div className="hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            )}

            {!userData ? (
              <button
                onClick={() => setOpenLogin(true)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="h-10 w-10 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center text-sm font-semibold"
                >
                  {avatarUrl ? (
                    <img
                      src={
                        avatarUrl || `https://ui-avatars.com/api/?name=${name}`
                      }
                      alt={userData.name || "User avatar"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    userInitial
                  )}
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">
                            {userData.name}
                            <p className="text-xs text-zinc-500 truncate">
                              {userData.email}
                            </p>
                          </p>
                        </div>
                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/10 hover:bg-white/5">
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>

                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5">Dashboard</button>
                        <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5">Logout</button>


                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Build Stunning Websites <br />
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Skip the coding. Just describe your idea and launch a beautiful,
          responsive site today.
        </motion.p>

        <button
          className="mt-12 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          onClick={() => setOpenLogin(true)}
        >
          Get Started
        </button>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-col-1 md:grid-cols-3 gap-10">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white/5 border border-white/10 p-8"
            >
              <h1 className="text-xl font-semibold mb-3">{h}</h1>
              <p className="text-sm text-zinc-400">
                Move from concept to launch with GenWeb.ai. Enjoy pixel-perfect
                responsiveness, smooth animations, and clean, scalable code—zero
                compromises.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai
      </footer>

      {openLogin && (
        <LoginModal
          open={openLogin}
          onClose={() => {
            setOpenLogin(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
