import { useState } from 'react'
import { useSignup } from '../hooks/useSignup.js'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await signup(name, email, password)
    if (success) navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="bg-white border border-[#EBE8DF] shadow-lg p-10 w-full max-w-md">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#16A34A] transition-colors duration-200 mb-6 cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>

        <h5 className="text-[#16A34A] text-xs tracking-[0.3em] font-bold mb-2">
          JOIN ILIGUIDE
        </h5>
        <h2 className="text-3xl font-light text-[#1C2421] mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1 tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 text-gray-800"
              placeholder="Juan dela Cruz"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1 tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 text-gray-800"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1 tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 text-gray-800"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1C2421] hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed text-white tracking-widest text-[10px] uppercase px-6 py-3 transition-colors duration-300 font-bold"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-[#16A34A] hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup