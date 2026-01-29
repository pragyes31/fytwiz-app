
import * as Types from './types';

export const calculateMealTotals = (items: Types.FoodItem[]) => {
  return items.reduce((acc, item) => ({
    calories: acc.calories + (parseFloat(item.calories) || 0),
    protein: acc.protein + (parseFloat(item.protein) || 0),
    carbs: acc.carbs + (parseFloat(item.carbs) || 0),
    fats: acc.fats + (parseFloat(item.fats) || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
};

export const calculateGrandTotal = (meals: Types.Meal[]) => {
  return meals.reduce((acc, meal) => {
    const mealTotals = calculateMealTotals(meal.items);
    return {
      calories: acc.calories + mealTotals.calories,
      protein: acc.protein + mealTotals.protein,
      carbs: acc.carbs + mealTotals.carbs,
      fats: acc.fats + mealTotals.fats,
    };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
};
