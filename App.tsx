
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import * as Types from './types';

// View Imports
import LandingPage from './views/LandingPage';
import PrivacyPolicy from './views/PrivacyPolicy';
import { CoachAuth, CoachDashboard, AddClientView, CoachClientView } from './views/CoachViews';
import { ClientDashboard, MagicLogin } from './views/ClientViews';
import { Header } from './components/Shared';

export default function App() {
  const [coach, setCoach] = useState<Types.Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'coaches', user.uid));
        setCoach(d.data() as Types.Coach);
      } else {
        setCoach(null);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => { 
    await signOut(auth); 
    navigate('/'); 
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-slate-300 animate-pulse">
      Initializing Fytwiz...
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={coach ? <Navigate to="/coach" /> : <LandingPage />} />
      <Route path="/auth" element={coach ? <Navigate to="/coach" /> : <CoachAuth />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      
      {/* Coach Routes */}
      <Route path="/coach" element={coach ? <><Header coachName={coach.name} onLogout={handleLogout} /><CoachDashboard coach={coach} /></> : <Navigate to="/auth" />} />
      <Route path="/coach/add-client" element={coach ? <><Header coachName={coach.name} onLogout={handleLogout} /><AddClientView coachId={coach.id} /></> : <Navigate to="/auth" />} />
      <Route path="/coach/client/:id" element={coach ? <><Header coachName={coach.name} onLogout={handleLogout} /><CoachClientView /></> : <Navigate to="/auth" />} />
      
      {/* Client Routes */}
      <Route path="/client-login/:token" element={<MagicLogin />} />
      <Route path="/client/dashboard/:id" element={<ClientDashboard />} />
    </Routes>
  );
}
