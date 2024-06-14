'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
const Error =({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <button
        onClick={
          // Пытаемся восстановиться путем повторного рендеринга сегмента
          () => reset()
        }
      >
        Попробовать снова
      </button>
    </div>
  )
}

export default Error