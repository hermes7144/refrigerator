import { createContext, useContext } from 'react';
import { MealProps } from '../types/mealTypes';

// Context 타입 정의
interface CopyContextType {
  copy: MealProps | null;
  setCopy: (meal: MealProps | null) => void;
}

// Context 초기값 설정
const CopyContext = createContext<CopyContextType | undefined>(undefined);

// Copy 상태와 핸들러를 쉽게 가져오는 커스텀 훅
export const useCopyContext = () => {
  const context = useContext(CopyContext);
  if (!context) {
    throw new Error('useCopy must be used within a CopyProvider');
  }
  return context;
};

export default CopyContext;

