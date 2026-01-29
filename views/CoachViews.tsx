
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  collection, query, where, onSnapshot, doc, addDoc, orderBy, setDoc 
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import * as Types from '../types';
import { Button, Logo } from '../components/Shared';
import { WorkoutPlanEditor, DietPlanEditor } from '../components/Editors';
// Added missing X icon to the lucide-react import list
import { 
  ArrowLeft, Share2, Plus, Users, ChevronRight, UserPlus, Mail, Lock, User, Eye, X
} from 'lucide-react';

export const CoachAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'coaches', res.user.uid), {
          id: res.user.uid,
          email,
          name
        });
      }
      navigate('/coach');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100 relative">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-8 flex items-center gap-1.5 text-slate-300 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Home
        </button>

        <div className="flex flex-col items-center mb-8 mt-4">
          <Logo className="mb-4" />
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{isLogin ? 'Welcome Back' : 'Join Fytwiz'}</h2>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 animate-fade-in">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input required placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm border border-transparent" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input required type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm border border-transparent" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input required type="password" placeholder="Password" className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm border border-transparent" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full py-4 rounded-2xl text-sm uppercase tracking-widest font-black shadow-lg shadow-blue-100">
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

export const CoachDashboard = ({ coach }: { coach: Types.Coach }) => {
  const [clients, setClients] = useState<Types.Client[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'clients'), where('coachId', '==', coach.id));
    return onSnapshot(q, (s) => {
      setClients(s.docs.map(d => ({ id: d.id, ...d.data() } as Types.Client)));
    });
  }, [coach.id]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Athletes</h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">{clients.length} Active Clients</p>
        </div>
        <Button onClick={() => navigate('/coach/add-client')} className="rounded-2xl px-6">
          <UserPlus size={18} /> <span className="hidden sm:inline">Add Athlete</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <Link key={client.id} to={`/coach/client/${client.id}`} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-150 group-hover:bg-blue-600/5" />
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users size={20} />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${client.status === Types.ClientStatus.ON_TRACK ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {client.status}
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">{client.name}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{client.goal}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Last Check-in: <span className="text-slate-900">{client.lastCheckInDate ? new Date(client.lastCheckInDate).toLocaleDateString() : 'Never'}</span>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const AddClientView = ({ coachId }: { coachId: string }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState<Types.ClientGoal>(Types.ClientGoal.FAT_LOSS);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // Strong magic link token (high entropy) for MVP
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    const magicLinkToken = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');

    const clientRef = doc(collection(db, 'clients'));
    await setDoc(clientRef, {
      id: clientRef.id,
      coachId,
      name,
      age: parseInt(age),
      goal,
      weight,
      height,
      location,
      status: Types.ClientStatus.ON_TRACK,
      magicLinkToken,
      createdAt: new Date().toISOString()
    });
    navigate('/coach');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10">
      <button onClick={() => navigate('/coach')} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-bold text-xs uppercase tracking-widest mb-8 transition-colors"><ArrowLeft size={16} /> Back</button>
      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Onboard Athlete</h2>
        <form onSubmit={handleAdd} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={name} onChange={e => setName(e.target.value)} />
            <input required type="number" placeholder="Age" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={age} onChange={e => setAge(e.target.value)} />
            <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={goal} onChange={e => setGoal(e.target.value as Types.ClientGoal)}>
              {Object.values(Types.ClientGoal).map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
            </select>
            <input required placeholder="Location" className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <Button type="submit" className="w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm">Create Profile</Button>
        </form>
      </div>
    </div>
  );
};

export const CoachClientView = () => {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [workout, setWorkout] = useState<any>(null);
  const [diet, setDiet] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [tab, setTab] = useState('workout');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    onSnapshot(doc(db, 'clients', id), (d) => setClient(d.data()));
    onSnapshot(doc(db, 'workoutPlans', id), (d) => setWorkout(d.data()));
    onSnapshot(doc(db, 'dietPlans', id), (d) => setDiet(d.data()));
    const q = query(collection(db, 'progressLogs'), where('clientId', '==', id), orderBy('date', 'desc'));
    onSnapshot(q, (s) => setLogs(s.docs.map(d => d.data())));
  }, [id]);

  if (!client) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20">
      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-slate-900/90 z-[200] flex items-center justify-center p-6" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto} className="max-w-full max-h-full rounded-3xl shadow-2xl" />
          <button className="absolute top-8 right-8 text-white"><X size={32}/></button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <button onClick={() => navigate('/coach')} className="p-3 border rounded-2xl hover:bg-slate-50"><ArrowLeft size={20} /></button>
        <div className="flex-1 text-center sm:text-left"><h2 className="text-3xl font-black text-slate-800">{client.name}</h2></div>
        <Button variant="outline" className="text-xs px-4" onClick={() => { navigator.clipboard.writeText(window.location.origin + '/#/client-login/' + client.magicLinkToken); alert('Access Link Copied!'); }}><Share2 size={16} /> Magic Link</Button>
      </div>

      <div className="flex gap-2 mb-8 bg-white p-1 rounded-2xl border overflow-x-auto scrollbar-hide">
        {['Workout', 'Diet', 'Logs', 'Info'].map(t => (
          <button key={t} onClick={() => setTab(t.toLowerCase())} className={`flex-1 py-3 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-colors ${tab === t.toLowerCase() ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>{t}</button>
        ))}
      </div>

      {tab === 'workout' && <WorkoutPlanEditor clientId={id} coachId={client.coachId} currentPlan={workout} />}
      {tab === 'diet' && <DietPlanEditor clientId={id} coachId={client.coachId} currentPlan={diet} />}
      {tab === 'logs' && (
        <div className="space-y-6">
          {logs.map((log, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{new Date(log.date).toLocaleDateString()}</p>
                  <p className="text-2xl font-black text-slate-800">{log.weight}kg</p>
                </div>
                {log.photoUrl && (
                  <button 
                    onClick={() => setSelectedPhoto(log.photoUrl)}
                    className="relative group overflow-hidden w-20 h-20 rounded-2xl border-2 border-slate-100"
                  >
                    <img src={log.photoUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={16} className="text-white"/></div>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-slate-50 p-2 rounded-lg text-center"><p className="text-xs font-black">{log.waist || '-'}</p><p className="text-[8px] font-bold text-slate-400">WAIST</p></div>
                <div className="bg-slate-50 p-2 rounded-lg text-center"><p className="text-xs font-black">{log.chest || '-'}</p><p className="text-[8px] font-bold text-slate-400">CHEST</p></div>
                <div className="bg-slate-50 p-2 rounded-lg text-center"><p className="text-xs font-black">{log.biceps || '-'}</p><p className="text-[8px] font-bold text-slate-400">BICEPS</p></div>
                <div className="bg-slate-50 p-2 rounded-lg text-center"><p className="text-xs font-black">{log.thighs || '-'}</p><p className="text-[8px] font-bold text-slate-400">THIGHS</p></div>
              </div>
              <div className={`p-4 rounded-2xl text-xs font-medium mb-2 ${log.followedPlan ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{log.followedPlan ? 'Plan followed.' : `Issues: ${log.issues}`}</div>
              {log.feedback && <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl italic">"{log.feedback}"</p>}
            </div>
          ))}
          {logs.length === 0 && <p className="text-center text-slate-400 py-20 font-bold">No logs yet.</p>}
        </div>
      )}
      {tab === 'info' && (
        <div className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-6">
          <h3 className="text-xl font-black text-slate-800">Athlete Profile</h3>
          <div className="grid grid-cols-2 gap-6">
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p><p className="font-bold">{client.age}</p></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Goal</p><p className="font-bold">{client.goal}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};
