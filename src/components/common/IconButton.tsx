// CommonButton.tsx
import React, { memo } from 'react';

interface CommonButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string; // Tooltip 텍스트
  className?: string; // 추가적인 클래스명
  children: React.ReactNode; // 버튼에 표시할 내용
}

const CommonButton: React.FC<CommonButtonProps> = memo(({ onClick, tooltip, className, children }) => {
  return (
    <div className="tooltip" data-tip={tooltip}>
      <button className={`btn btn-circle btn-ghost btn-sm hover:bg-slate-200 ${className}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
});

export default CommonButton;
