
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  doc, onSnapshot, addDoc, updateDoc, query, collection, where, limit, getDocs, orderBy 
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import * as Types from '../types';
import { Logo, Button } from '../components/Shared';
import { calculateGrandTotal } from '../helpers';

export const CheckInForm = ({ onCancel, onSubmit }: any) => {
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [biceps, setBiceps] = useState('');
  const [thighs, setThighs] = useState('');
  const [calves, setCalves] = useState('');
  const [feedback, setFeedback] = useState('');
  const [followedPlan, setFollowedPlan] = useState(true);
  const [issues, setIssues] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Note: Photo upload feature temporarily disabled for MVP
  // Firebase Storage requires paid plan - can be re-enabled when ready to upgrade

  const handleFormSubmit = async () => {
    if (!weight) {
      setError('Please enter your weight.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await onSubmit({ 
        weight, waist, chest, biceps, thighs, calves, 
        feedback, followedPlan, issues, 
        date: new Date().toISOString() 
      });
      setIsSubmitting(false);
    } catch (err: any) {
      console.error('Error submitting check-in:', err);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to submit check-in. Please try again.';

      if (err.message?.includes('network') || err.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (err.message?.includes('permission')) {
        errorMessage = 'Permission denied. Please contact your coach.';
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <h2 className="text-2xl font-black text-slate-800">Submit Progress</h2>
      {error && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">{error}</div>}
      
      <div className="space-y-4">
        {/* Photo upload feature temporarily disabled for MVP - Firebase Storage requires paid plan */}

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Current Weight (kg) *</label>
          <input required type="number" step="0.1" className="w-full p-4 bg-slate-50 rounded-2xl font-black text-2xl outline-none border border-slate-100 focus:ring-2 focus:ring-blue-500" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Waist (cm)</label><input type="number" className="w-full p-3 bg-slate-50 rounded-xl font-bold border border-slate-100 outline-none" value={waist} onChange={e => setWaist(e.target.value)} /></div>
          <div><label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Chest (cm)</label><input type="number" className="w-full p-3 bg-slate-50 rounded-xl font-bold border border-slate-100 outline-none" value={chest} onChange={e => setChest(e.target.value)} /></div>
          <div><label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Biceps (cm)</label><input type="number" className="w-full p-3 bg-slate-50 rounded-xl font-bold border border-slate-100 outline-none" value={biceps} onChange={e => setBiceps(e.target.value)} /></div>
          <div><label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Thighs (cm)</label><input type="number" className="w-full p-3 bg-slate-50 rounded-xl font-bold border border-slate-100 outline-none" value={thighs} onChange={e => setThighs(e.target.value)} /></div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Did you follow the plan? *</label>
          <div className="flex gap-2">
            <button onClick={() => setFollowedPlan(true)} className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all ${followedPlan ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>YES</button>
            <button onClick={() => setFollowedPlan(false)} className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all ${!followedPlan ? 'bg-red-500 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>NO</button>
          </div>
        </div>
        {!followedPlan && (
          <div className="animate-fade-in"><label className="block text-[10px] font-black uppercase text-slate-400 mb-2">What went wrong?</label><textarea className="w-full p-4 bg-slate-50 rounded-2xl min-h-[80px] outline-none border border-slate-100" value={issues} onChange={e => setIssues(e.target.value)} /></div>
        )}
        <div><label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Weekly Notes</label><textarea className="w-full p-4 bg-slate-50 rounded-2xl min-h-[120px] outline-none border border-slate-100" value={feedback} onChange={e => setFeedback(e.target.value)} /></div>
      </div>
      <Button onClick={handleFormSubmit} className="w-full py-4 text-lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send to Coach'}
      </Button>
      <button onClick={onCancel} className="w-full py-2 text-slate-400 font-bold uppercase text-[10px] mt-2">Back</button>
    </div>
  );
};

export const ClientDashboard = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Types.Client | null>(null);
  const [workout, setWorkout] = useState<Types.WorkoutPlan | null>(null);
  const [diet, setDiet] = useState<Types.DietPlan | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'workout' | 'diet' | 'progress'>('workout');

  useEffect(() => {
    if (!id) return;
    onSnapshot(doc(db, 'clients', id), (d) => setClient(d.data() as Types.Client));
    onSnapshot(doc(db, 'workoutPlans', id), (d) => setWorkout(d.data() as Types.WorkoutPlan));
    onSnapshot(doc(db, 'dietPlans', id), (d) => setDiet(d.data() as Types.DietPlan));
    const q = query(collection(db, 'progressLogs'), where('clientId', '==', id), orderBy('date', 'desc'));
    return onSnapshot(q, (s) => setLogs(s.docs.map(d => d.data())));
  }, [id]);

  if (!client) return <div className="p-12 text-center text-slate-300 font-bold animate-pulse">Syncing with Coach...</div>;

  const grandTotal = calculateGrandTotal(diet?.meals || []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-20">
      <header className="bg-white p-4 border-b flex justify-between items-center px-6 sticky top-0 z-50 shadow-sm">
        <Logo size="sm" />
        <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-50 px-3 py-1 rounded-full tracking-wider">Dashboard</span>
      </header>

      {showLogForm ? (
        <CheckInForm 
          onCancel={() => setShowLogForm(false)} 
          onSubmit={async (log: any) => {
            // Photo upload feature temporarily disabled for MVP
            // Firebase Storage requires paid plan - can be re-enabled when ready to upgrade

            // Build document data without photo
            const progressLogData: any = {
              weight: log.weight,
              waist: log.waist,
              chest: log.chest,
              biceps: log.biceps,
              thighs: log.thighs,
              calves: log.calves,
              feedback: log.feedback,
              followedPlan: log.followedPlan,
              issues: log.issues,
              date: log.date,
              coachId: client?.coachId,
              clientId: id
            };

            await addDoc(collection(db, 'progressLogs'), progressLogData);
            await updateDoc(doc(db, 'clients', id!), { lastCheckInDate: log.date });
            setShowLogForm(false);
            setActiveTab('progress');
          }} 
        />
      ) : (
        <div className="p-5 animate-fade-in space-y-6">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h2 className="text-3xl font-black mb-2">Hey, {client.name.split(' ')[0]} 👋</h2>
            <p className="text-sm opacity-80 mb-6">"Consistency is the only secret."</p>
            <Button 
              variant="white"
              onClick={() => setShowLogForm(true)} 
              className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Weekly Check-In
            </Button>
          </div>

          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
            {(['workout', 'diet', 'progress'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === t ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === 'workout' && (
            <div className="bg-white p-6 rounded-[2rem] border shadow-sm">
              <h3 className="font-black text-blue-600 mb-4 uppercase text-xs tracking-widest">Training Protocol</h3>
              {workout?.days?.map((d, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <p className="font-black text-xs text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">{d.dayName}</p>
                  {d.exercises.map((ex, j) => (
                    <div key={j} className="py-3 border-b border-slate-50 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-slate-800">{ex.name}</span>
                        {(ex.sets || ex.reps) && (
                          <span className="font-black text-blue-600 text-[10px] whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-full">
                            {ex.sets || '-'} sets x {ex.reps || '-'} reps
                          </span>
                        )}
                      </div>
                      {ex.videoUrl && (
                        <a href={ex.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-black text-blue-500 uppercase hover:underline mt-1">
                          <Video size={12}/> Watch Form Video
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {(!workout || workout.days.length === 0) && <p className="text-xs text-slate-400 italic">Coach is building your workout...</p>}
            </div>
          )}

          {activeTab === 'diet' && (
            <div className="bg-white p-6 rounded-[2rem] border shadow-sm space-y-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-black text-blue-600 uppercase text-xs tracking-widest">Daily Macro Goals</h3>
                <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase">{Math.round(grandTotal.calories)} KCAL</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                  <p className="text-sm font-black text-blue-700">{Math.round(grandTotal.protein)}g</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Protein</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                  <p className="text-sm font-black text-blue-700">{Math.round(grandTotal.carbs)}g</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Carbs</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                  <p className="text-sm font-black text-blue-700">{Math.round(grandTotal.fats)}g</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Fats</p>
                </div>
              </div>

              <div className="space-y-6">
                {diet?.meals?.map((m, i) => (
                  <div key={i} className="last:mb-0">
                    <p className="font-black text-xs text-slate-400 uppercase tracking-widest border-b pb-1 mb-3">{m.name}</p>
                    <div className="space-y-3">
                      {m.items.map((it, j) => (
                        <div key={j} className="p-3 bg-slate-50 rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-800 font-bold">{it.name}</span>
                            <span className="font-black text-blue-600 text-xs">{it.amount}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50">
                            <div className="px-2 py-0.5 bg-white border border-slate-100 rounded text-[9px] font-black text-slate-500 shadow-sm"><span className="text-blue-600">{it.calories}</span> kcal</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {(!diet || diet.meals.length === 0) && <p className="text-xs text-slate-400 italic">No plan yet.</p>}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-4">
              {logs.map((log, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{new Date(log.date).toLocaleDateString()}</p>
                    <p className="text-xl font-black text-slate-800">{log.weight}kg</p>
                  </div>
                  {log.photoUrl && (
                    <div className="mb-4 rounded-2xl overflow-hidden aspect-[4/3]">
                      <img src={log.photoUrl} alt="Progress" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="grid grid-cols-4 gap-1.5 mb-4">
                    <div className="bg-slate-50 p-1.5 rounded-lg text-center"><p className="text-[10px] font-black">{log.waist || '-'}</p><p className="text-[7px] font-bold text-slate-400 uppercase">Wst</p></div>
                    <div className="bg-slate-50 p-1.5 rounded-lg text-center"><p className="text-[10px] font-black">{log.chest || '-'}</p><p className="text-[7px] font-bold text-slate-400 uppercase">Chst</p></div>
                    <div className="bg-slate-50 p-1.5 rounded-lg text-center"><p className="text-[10px] font-black">{log.biceps || '-'}</p><p className="text-[7px] font-bold text-slate-400 uppercase">Bic</p></div>
                    <div className="bg-slate-50 p-1.5 rounded-lg text-center"><p className="text-[10px] font-black">{log.thighs || '-'}</p><p className="text-[7px] font-bold text-slate-400 uppercase">Thgh</p></div>
                  </div>
                  {log.feedback && <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl italic">"{log.feedback}"</p>}
                </div>
              ))}
              {logs.length === 0 && <p className="text-center py-20 text-slate-400 font-bold">No logs yet.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const MagicLogin = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const q = query(collection(db, 'clients'), where('magicLinkToken', '==', token), limit(1));
    getDocs(q).then(s => {
      if (!s.empty) navigate(`/client/dashboard/${s.docs[0].id}`);
      else alert("Invalid Link.");
    });
  }, [token, navigate]);
  return <div className="p-12 text-center font-bold text-slate-300 animate-pulse">Authenticating...</div>;
};
