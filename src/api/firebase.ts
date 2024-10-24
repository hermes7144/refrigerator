import { IngredientProps } from './../types/ingredientTypes';
import { RecipeProps } from '../types/RecipeTypes';
import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {  get, getDatabase, ref, remove, runTransaction, serverTimestamp, set, update } from 'firebase/database';
import { MealProps, MealsByDate } from '../types/mealTypes';

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
export async function getIngredients(uid: string): Promise<IngredientProps[]> {
  const snapshot = await get(ref(database, `ingredients/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function getIngredient(uid: string, ingredient: IngredientProps): Promise<IngredientProps | null> {
  const snapshot = await get(ref(database, `ingredients/${uid}/${ingredient.id}`));

  if (snapshot.exists()) {    
    return snapshot.val();
  } else {
    return null;
  }
}

export const fetchMealByTypeAndDate = async (uid: string, date: string, mealType: string,) => {
  const snapshot = await get(ref(database, `meals/${uid}/${date}/${mealType}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null; // 해당 데이터가 없으면 null 반환
  }
};

export async function addNewIngredient(uid: string, ingredient: IngredientProps): Promise<void> {
  const id = uuid();

  await set(ref(database, `ingredients/${uid}/${id}`), {
    ...ingredient,
    id,
    createdDate: serverTimestamp(),
  });
}

export async function editIngredient(uid: string, ingredient: IngredientProps): Promise<void> {
  return set(ref(database, `ingredients/${uid}/${ingredient.id}`), ingredient);
}

export async function removeIngredient(uid: string, ingredient: IngredientProps): Promise<void> {
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

export async function getMeal(uid: string, meal: MealProps): Promise<MealProps | null> {
  const snapshot = await get(ref(database, `meals/${uid}/${meal.date}/${meal.mealType}`));

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}


export async function addNewMeal(uid: string, meal: MealProps): Promise<MealProps> {
  const id = uuid();
  
  const mealData = {
    ...meal,
    id,
    createdDate: serverTimestamp(),
    done: false,
  };

  await set(ref(database, `meals/${uid}/${meal.date}/${meal.mealType}`), mealData);
  return meal;
}

export async function editMeal(uid: string, meal: MealProps): Promise<MealProps> {
  const originMeal = await getMeal(uid, meal);
  if (originMeal && originMeal.done) {
    await updateIngredientsQuantity(uid, originMeal.ingredients, true);           

    await updateIngredientsQuantity(uid, meal.ingredients);
  }

  const mealData = {...meal, updatedDate: serverTimestamp()};

   await set(ref(database, `meals/${uid}/${meal.date}/${meal.mealType}`), mealData);
   return meal;
}

export async function deleteMeal(uid: string, meal: MealProps): Promise<MealProps> {
  await remove(ref(database, `meals/${uid}/${meal.date}/${meal.mealType}`));
  return meal;
}

export async function checkMeal(uid: string, meal: MealProps): Promise<MealProps> {
  const mealRef = ref(database, `meals/${uid}/${meal.date}/${meal.mealType}`);
  await update(mealRef, { done: meal.done });
  return meal;
}

export async function updateIngredientsQuantity(uid: string, ingredients: IngredientProps[], isAdding?: boolean): Promise<void> {  
  console.log(ingredients,isAdding);
  

  for (const ingredient of ingredients) {    
    const ingredientRef = ref(database, `ingredients/${uid}/${ingredient.id}/qty`);

    await runTransaction(ingredientRef, (currentQty) => {
      return isAdding ? (currentQty || 0) + ingredient.qty : (currentQty || 0) - Number(ingredient.qty);
    });
  }
}

export async function updateIngredientQuantity(uid: string, ingredient:IngredientProps): Promise<void> {
  const ingredientRef = ref(database, `ingredients/${uid}/${ingredient.id}/qty`);

  await runTransaction(ingredientRef, (currentQty) => {
    return (currentQty || 0) + ingredient.qty;
  });
}

export async function getRecipes(uid: string): Promise<RecipeProps[]> {
  const snapshot = await get(ref(database, `recipes/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function addNewRecipe(uid: string, recipe: RecipeProps): Promise<void> {
  const id = uuid();

  const recipeData = {
    ...recipe,
    id,
    createdDate: serverTimestamp(),
  };

  await set(ref(database, `recipes/${uid}/${id}`), recipeData);
}

export async function editRecipe(uid: string, recipe: RecipeProps): Promise<void> {
  const recipeData = {
    ...recipe,
    updatedDate: serverTimestamp(),
  };

  return set(ref(database, `recipes/${uid}/${recipe.id}`), recipeData);
}

export async function deleteRecipe(uid: string, recipe: RecipeProps): Promise<void> {
  await remove(ref(database, `recipes/${uid}/${recipe.id}`));
}

export async function updateIngredientRecipe(uid: string, ingredientId: string, quantityChange: number): Promise<void> {
  const ingredientRef = ref(database, `recipes/${uid}/${ingredientId}/qty`);

  await runTransaction(ingredientRef, (currentQty) => {
    return (currentQty || 0) + quantityChange;
  });
}

export async function getShoppings(uid: string): Promise<IngredientProps[]> {
  const snapshot = await get(ref(database, `shoppings/${uid}`));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export async function addNewShopping(uid: string, shopping: IngredientProps): Promise<void> {
  const id = uuid();

  const shoppingData = {
    ...shopping,
    id,
    createdDate: serverTimestamp(),
  };

  await set(ref(database, `shoppings/${uid}/${id}`), shoppingData);
}

export async function editShopping(uid: string, shopping: IngredientProps): Promise<void> {
  const shoppingData = {
    ...shopping,
    modifiedDate: serverTimestamp(),
  };

  return set(ref(database, `shoppings/${uid}/${shopping.id}`), shoppingData);
}

export async function removeShopping(uid: string, shopping: IngredientProps): Promise<void> {
  await remove(ref(database, `shoppings/${uid}/${shopping.id}`));
}
