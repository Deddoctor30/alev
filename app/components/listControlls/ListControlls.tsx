import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const ListControlls = ({ id, methodDelete, openModal, setUpdateId }: { id: number, methodDelete: Function, openModal: Function, setUpdateId: Function }) => {
   const update = (id: number) => {
      openModal(true)
      setUpdateId(id)
   }

  return (
    <>
      <Space>
         <ConfigProvider
            theme={{
            components: {
               Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                  lineWidth: 0,
               },
            },
            }}>
            <Button type="primary" size="large" onClick={() => methodDelete(id)}>
               Удалить
            </Button>
         </ConfigProvider>
         <ConfigProvider
            theme={{
            components: {
               Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                  lineWidth: 0,
               },
            },
            }}
         >
            <Button type="primary" size="large" onClick={() => update(id)}>
               Обновить
            </Button>
         </ConfigProvider>
      </Space>
    </>
  )
}

export default ListControlls