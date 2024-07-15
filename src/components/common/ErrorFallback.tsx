import { FallbackProps, useErrorBoundary } from "react-error-boundary";
import Button from '../ui/Button';

export default function ErrorFallback({ error } : FallbackProps ) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button text={'다시 시도해주세요.'} onClick={resetBoundary}></Button>
    </div>
  );
}