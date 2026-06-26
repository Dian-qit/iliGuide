import { Routes, Route } from 'react-router'

import Overview from './app/pages/Overview'
import TouristSpots from './app/pages/TouristSpots'
import TouristSpotDetails from './app/pages/TouristSpotDetails'
import SignUp from './app/pages/SignUp'
import Login from './app/pages/Login'
import Activities from './app/pages/Activities'

const App = () => {
  return (
    <div className='bg-slate-50'>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/tourist-spots" element={<TouristSpots />} />
        <Route path="/tourist-spots/:id" element={<TouristSpotDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  )
}

export default App
