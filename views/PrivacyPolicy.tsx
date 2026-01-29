
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Scale } from 'lucide-react';
import { Button, Logo } from '../components/Shared';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <Logo size="md" />
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
          </div>

          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-12">Last Updated: October 2024</p>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-600" size={24} />
                <h2 className="text-xl font-black text-slate-800">1. Data Collection</h2>
              </div>
              <p>
                Fytwiz collects personal information necessary for health coaching, including but not limited to: name, age, gender, weight, height, body measurements, and dietary preferences. This data is collected solely for the purpose of allowing your professional coach to design and monitor your fitness program.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-blue-600" size={24} />
                <h2 className="text-xl font-black text-slate-800">2. Health Data Sensitivity (PHI)</h2>
              </div>
              <p>
                We recognize that health data is sensitive. Your metrics (weight, waist size, etc.) are only visible to you and your designated coach. Fytwiz does not sell, rent, or share your health data with third-party advertisers or data brokers.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <EyeOff className="text-blue-600" size={24} />
                <h2 className="text-xl font-black text-slate-800">3. Data Isolation</h2>
              </div>
              <p>
                Our platform architecture ensures that each coach's athlete roster is isolated. Coaches cannot view athletes assigned to other professionals on the platform. Athlete access is granted via unique, high-entropy tokens (Magic Links) which should be treated with the same confidentiality as a password.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-blue-600" size={24} />
                <h2 className="text-xl font-black text-slate-800">4. Your Rights</h2>
              </div>
              <p>
                You have the right to request a copy of your data or request the deletion of your profile and historical logs at any time. To do so, please contact your coach or reach out to our support team directly.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400 mb-6">Questions about our practices?</p>
            <Button onClick={() => window.location.href = 'mailto:privacy@fytwiz.com'} variant="outline">Contact Privacy Team</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
