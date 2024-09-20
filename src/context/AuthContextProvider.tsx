import { createContext, useEffect, useState } from 'react';
import { addNewIngredient, addNewMeal, addNewRecipe, addNewShopping, getIngredients, login, logout, onUserStateChange } from '../api/firebase';
import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { providerProps } from '../types/commonTypes';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface AuthContextType {
  user: User | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
  isAuthLoading: boolean;
  demo: ()=>void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: providerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    onUserStateChange((user: User | null) => {
      setUser(user);
      setIsAuthLoading(false);
    });
  }, []);

  const auth = getAuth();

  function demo() {
    // 익명 로그인 처리
    signInAnonymously(auth)
      .then((userCredential) => {
        // 익명 로그인 성공 시 사용자 정보 저장
        const user = userCredential.user;
        setUser(user);
        initializeDatabase(user.uid); // 데이터 초기화 함수 호출
      })
      .catch((error) => {
        console.error('Anonymous login failed', error);
      });
  }

  const initializeDatabase = async (uid:string) => {
    // 예시 재료 데이터 추가
    await addNewIngredient(uid, {
      name: '토마토',
      qty: 10,
      unit: 'ea',
      id: '',
      expiration: '',
      category: 'vegitable',
    });

    await addNewIngredient(uid, {
      name: '파스타',
      qty: 200,
      unit: 'g',
      id: '',
      expiration: '',
      category: 'vegitable',

    });

    await addNewIngredient(uid, {
      name: '토마토 소스',
      qty: 1,
      unit: 'ea',
      id: '',
      expiration: '',
      category: 'vegitable',
    });

    // 저장된 재료를 가져와서 새로운 식사 데이터 생성
    const ingredients = await getIngredients(uid);

    await addNewMeal(uid, {
      mealType: 'dinner',
      date: dayjs().format('YYYYMMDD'),
      ingredients: ingredients.filter((ingredient) => ingredient.name === '파스타' || ingredient.name === '토마토 소스'),
      id: '',
      done:false
    });
    
    queryClient.invalidateQueries ({queryKey:['meals',uid]}),

    await addNewRecipe(uid, {
      name: '토마토 수프',
      ingredients: ingredients.filter((ingredient) => ingredient.name === '토마토'),
      id: '',
    });

    await addNewShopping(uid, {
      name: '빵',
      qty: 2,
      unit: 'ea',
      id: '',
      expiration: '',
      category: 'vegitable',
    });

    console.log('데이터베이스가 데모 데이터로 초기화되었습니다.');
  };

  return <AuthContext.Provider value={{ user, uid: (user && user.uid) ?? null, login, logout, isAuthLoading, demo }}>{children}</AuthContext.Provider>;
}
