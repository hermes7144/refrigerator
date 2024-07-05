import { Ingredient } from './../types/ingredientTypes';
import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { get, getDatabase, ref, remove, runTransaction, serverTimestamp, set, update } from 'firebase/database';
import { Meal, MealsByDate } from '../types/mealTypes';
import { Recipe } from '../types/RecipeTypes';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function getIngredients(uid: string): Promise<Ingredient[]> {
  const snapshot = await get(ref(database, `ingredients/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function addNewIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  const id = uuid();

  await set(ref(database, `ingredients/${uid}/${id}`), {
    ...ingredient,
    id,
    createdDate: serverTimestamp(),
  });
}

export async function editIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  return set(ref(database, `ingredients/${uid}/${ingredient.id}`), ingredient);
}

export async function removeIngredient(uid: string, ingredient: Ingredient): Promise<void> {
  return remove(ref(database, `ingredients/${uid}/${ingredient.id}`));
}

export async function getMeals(uid: string): Promise<MealsByDate> {
  const snapshot = await get(ref(database, `meals/${uid}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
}

export async function addNewMeal(uid: string, meal: Meal): Promise<void> {
  const id = uuid();

  const mealData = {
    id,
    name: meal.name,
    createdDate: serverTimestamp(),
    done: false,
    ingredients: meal.ingredients.reduce((acc: Record<string, Ingredient>, ingredient: Ingredient) => {
      acc[ingredient.id] = ingredient;
      return acc;
    }, {}),
  };

  await set(ref(database, `meals/${uid}/${meal.date}/${meal.name}`), mealData);
}

export async function editMeal(uid: string, meal: Meal): Promise<void> {
  const mealData = {
    id: meal.id,
    name: meal.name,
    done:meal.done,
    createdDate: serverTimestamp(),
    ingredients: meal.ingredients.reduce((acc: Record<string, Ingredient>, ingredient) => {
      acc[ingredient.id] = ingredient;
      return acc;
    }, {}),
  };  

  await set(ref(database, `meals/${uid}/${meal.date}/${meal.name}`), mealData);
}

export async function deleteMeal(uid: string, meal: { name: string; date: string }): Promise<void> {
  await remove(ref(database, `meals/${uid}/${meal.date}/${meal.name}`));
}

export async function checkMeal(uid: string, meal: { name: string; date: string; done: boolean }): Promise<void> {
  const mealRef = ref(database, `meals/${uid}/${meal.date}/${meal.name}`);
  await update(mealRef, { done: meal.done });
}

// Ingredient 수량 업데이트 함수
export async function updateIngredientQuantity(uid: string, ingredientId: string, quantityChange: number): Promise<void> {
  const ingredientRef = ref(database, `ingredients/${uid}/${ingredientId}/qty`);

  await runTransaction(ingredientRef, (currentQty) => {
    return (currentQty || 0) + quantityChange;
  });
}

export async function getRecipes(uid: string): Promise<Recipe[]> {
  const snapshot = await get(ref(database, `recipes/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function addNewRecipe(uid: string, recipe:Recipe): Promise<void> {
  const id = uuid();

  const recipeData = {
    id,
    name: recipe.name,
    createdDate: serverTimestamp(),
    ingredients: recipe.ingredients.reduce((acc: Record<string, Ingredient>, ingredient: Ingredient) => {
      acc[ingredient.id] = ingredient;
      return acc;
    }, {}),
  };


  await set(ref(database, `recipes/${uid}/${id}`), recipeData);
}

export async function editRecipe(uid: string, recipe:Recipe): Promise<void> {
  const recipeData = {
    id: recipe.id,
    name: recipe.name,
    createdDate: serverTimestamp(),
    ingredients: recipe.ingredients.reduce((acc: Record<string, Ingredient>, ingredient) => {
      acc[ingredient.id] = ingredient;
      return acc;
    }, {}),
  };  

  return set(ref(database, `ingredients/${uid}/${recipe.id}`), recipeData);
}

export async function deleteRecipe(uid: string, recipe:Recipe): Promise<void> {
  await remove(ref(database, `recipes/${uid}/${recipe.id}`));
}

// Ingredient 수량 업데이트 함수
export async function updateIngredientRecipe(uid: string, ingredientId: string, quantityChange: number): Promise<void> {
  const ingredientRef = ref(database, `recipes/${uid}/${ingredientId}/qty`);

  await runTransaction(ingredientRef, (currentQty) => {
    return (currentQty || 0) + quantityChange;
  });
}
