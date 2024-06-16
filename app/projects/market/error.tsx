'use client' // Error components must be Client Components
 
import { Button, ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { TinyColor } from '@ctrl/tinycolor';
import { useRouter } from 'next/navigation';


const colors3 = ['#40e495', '#30dd8a', '#2bb673'];

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

 
const Error =({ error, reset }: { error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()
 
  return (
    <div className='error'>
      <h2 className='error__title'>Что-то пошло не так</h2>
      <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button style={{marginBottom: '20px'}} type="primary" size="large" className='error__button' onClick={() => reset()}>
        Попробовать снова
      </Button>
    </ConfigProvider>
    </div>
  )
}

export default Error