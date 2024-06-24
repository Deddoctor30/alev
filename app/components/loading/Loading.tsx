import { Spin } from 'antd';

const Loading = () => {
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Spin style={{width: '1100px'}} size="large"/>
  </div>
  )
}

export default Loading