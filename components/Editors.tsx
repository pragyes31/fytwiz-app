
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { Trash2, Video, X } from 'lucide-react';
import { db } from '../firebaseConfig';
import * as Types from '../types';
import { Button } from './Shared';
import { calculateGrandTotal } from '../helpers';

export const WorkoutPlanEditor = ({ clientId, coachId, currentPlan }: any) => {
  const [days, setDays] = useState<Types.WorkoutDay[]>(currentPlan?.days || []);
  const [saved, setSaved] = useState(false);

  const addDay = () => setDays([...days, { id: Math.random().toString(), dayName: 'Day ' + (days.length + 1), exercises: [] }]);
  const addEx = (dayId: string) => setDays(days.map(d => d.id === dayId ? { ...d, exercises: [...d.exercises, { id: Math.random().toString(), name: '', sets: '', reps: '', videoUrl: '' }] } : d));
  const updateEx = (dayId: string, exId: string, field: string, val: string) => setDays(days.map(d => d.id === dayId ? { ...d, exercises: d.exercises.map(e => e.id === exId ? { ...e, [field]: val } : e) } : d));
  const removeEx = (dayId: string, exId: string) => setDays(days.map(d => d.id === dayId ? { ...d, exercises: d.exercises.filter(e => e.id !== exId) } : d));

  const handleSave = async () => {
    await setDoc(
      doc(db, 'workoutPlans', clientId),
      { days, clientId, coachId: coachId || currentPlan?.coachId || null },
      { merge: true }
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {days.map(day => (
        <div key={day.id} className="bg-white p-6 rounded-3xl border shadow-sm">
          <input className="font-black uppercase text-xs mb-4 w-full bg-slate-50 p-2 rounded" value={day.dayName} onChange={e => setDays(days.map(d => d.id === day.id ? { ...d, dayName: e.target.value } : d))} />
          <div className="space-y-4">
            {day.exercises.map(ex => (
              <div key={ex.id} className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex gap-2">
                  <input placeholder="Exercise" className="flex-1 p-2 bg-white rounded-lg text-sm font-bold" value={ex.name} onChange={e => updateEx(day.id, ex.id, 'name', e.target.value)} />
                  <input placeholder="Sets" className="w-16 p-2 bg-white rounded-lg text-sm font-bold text-center" value={ex.sets} onChange={e => updateEx(day.id, ex.id, 'sets', e.target.value)} />
                  <input placeholder="Reps" className="w-16 p-2 bg-white rounded-lg text-sm font-bold text-center" value={ex.reps} onChange={e => updateEx(day.id, ex.id, 'reps', e.target.value)} />
                  <button onClick={() => removeEx(day.id, ex.id)} className="text-red-400 p-1"><Trash2 size={16}/></button>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                  <Video size={14} className="text-slate-400" />
                  <input placeholder="YouTube link" className="w-full bg-transparent text-xs outline-none" value={ex.videoUrl || ''} onChange={e => updateEx(day.id, ex.id, 'videoUrl', e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={() => addEx(day.id)} className="w-full py-3 border-2 border-dashed rounded-2xl text-xs font-bold text-slate-400 hover:text-blue-600 hover:border-blue-200">+ Add Exercise</button>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <Button variant="outline" onClick={addDay} className="flex-1">Add Training Day</Button>
        <Button onClick={handleSave} className="flex-1">{saved ? 'Saved!' : 'Save Workout'}</Button>
      </div>
    </div>
  );
};

export const DietPlanEditor = ({ clientId, coachId, currentPlan }: any) => {
  const [meals, setMeals] = useState<Types.Meal[]>(currentPlan?.meals || []);
  const [saved, setSaved] = useState(false);

  const addMeal = () => setMeals([...meals, { id: Math.random().toString(), name: 'Meal ' + (meals.length + 1), items: [] }]);
  const addItem = (mealId: string) => setMeals(meals.map(m => m.id === mealId ? { ...m, items: [...m.items, { id: Math.random().toString(), name: '', amount: '', calories: '', protein: '', carbs: '', fats: '' }] } : m));
  const updateItem = (mealId: string, itemId: string, field: string, val: string) => setMeals(meals.map(m => m.id === mealId ? { ...m, items: m.items.map(i => i.id === itemId ? { ...i, [field]: val } : i) } : m));
  const removeItem = (mealId: string, itemId: string) => setMeals(meals.map(m => m.id === mealId ? { ...m, items: m.items.filter(i => i.id !== itemId) } : m));

  const handleSave = async () => {
    await setDoc(
      doc(db, 'dietPlans', clientId),
      { meals, clientId, coachId: coachId || currentPlan?.coachId || null },
      { merge: true }
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const grandTotal = calculateGrandTotal(meals);

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 p-6 rounded-3xl text-white flex justify-between items-center shadow-lg">
        <div><h4 className="text-xs font-black uppercase tracking-widest opacity-60">Total Daily Targets</h4><p className="text-3xl font-black">{Math.round(grandTotal.calories)} kcal</p></div>
        <div className="flex gap-4 text-center">
          <div><p className="text-sm font-black">{Math.round(grandTotal.protein)}g</p><p className="text-[10px] font-bold opacity-60">PRO</p></div>
          <div><p className="text-sm font-black">{Math.round(grandTotal.carbs)}g</p><p className="text-[10px] font-bold opacity-60">CHO</p></div>
          <div><p className="text-sm font-black">{Math.round(grandTotal.fats)}g</p><p className="text-[10px] font-bold opacity-60">FAT</p></div>
        </div>
      </div>
      {meals.map(meal => (
        <div key={meal.id} className="bg-white p-6 rounded-3xl border shadow-sm">
          <input className="font-black uppercase text-xs mb-4 w-full bg-slate-50 p-2 rounded" value={meal.name} onChange={e => setMeals(meals.map(m => m.id === meal.id ? { ...m, name: e.target.value } : m))} />
          <div className="space-y-3">
            {meal.items.map(item => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative">
                <button onClick={() => removeItem(meal.id, item.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14}/></button>
                <div className="flex gap-2">
                  <input placeholder="Food Item" className="flex-1 p-2 bg-white rounded-lg text-sm font-bold" value={item.name} onChange={e => updateItem(meal.id, item.id, 'name', e.target.value)} />
                  <input placeholder="Qty" className="w-20 p-2 bg-white rounded-lg text-sm font-bold text-center" value={item.amount} onChange={e => updateItem(meal.id, item.id, 'amount', e.target.value)} />
                </div>
                <div className="grid grid-cols-4 gap-2">
                   <div className="bg-white p-2 rounded-lg text-center"><input placeholder="kcal" className="w-full text-xs font-black text-center outline-none" value={item.calories} onChange={e => updateItem(meal.id, item.id, 'calories', e.target.value)} /><p className="text-[9px] text-slate-400 font-bold">KCAL</p></div>
                   <div className="bg-white p-2 rounded-lg text-center"><input placeholder="P" className="w-full text-xs font-black text-center outline-none" value={item.protein} onChange={e => updateItem(meal.id, item.id, 'protein', e.target.value)} /><p className="text-[9px] text-slate-400 font-bold">PRO</p></div>
                   <div className="bg-white p-2 rounded-lg text-center"><input placeholder="C" className="w-full text-xs font-black text-center outline-none" value={item.carbs} onChange={e => updateItem(meal.id, item.id, 'carbs', e.target.value)} /><p className="text-[9px] text-slate-400 font-bold">CHO</p></div>
                   <div className="bg-white p-2 rounded-lg text-center"><input placeholder="F" className="w-full text-xs font-black text-center outline-none" value={item.fats} onChange={e => updateItem(meal.id, item.id, 'fats', e.target.value)} /><p className="text-[9px] text-slate-400 font-bold">FAT</p></div>
                </div>
              </div>
            ))}
            <button onClick={() => addItem(meal.id)} className="w-full py-3 border-2 border-dashed rounded-2xl text-xs font-bold text-slate-400 hover:text-blue-600 hover:border-blue-200">+ Add Food Item</button>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <Button variant="outline" onClick={addMeal} className="flex-1">Add Meal</Button>
        <Button onClick={handleSave} className="flex-1">{saved ? 'Saved!' : 'Save Diet Plan'}</Button>
      </div>
    </div>
  );
};
