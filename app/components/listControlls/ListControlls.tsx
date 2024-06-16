import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import { Dispatch, SetStateAction } from 'react';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const ListControlls = ({ id, methodDelete, openModal, setUpdateId, setRefresh }: { id: number, methodDelete: (id: number) => Promise<void>, openModal: Dispatch<SetStateAction<boolean>>, setUpdateId: Dispatch<SetStateAction<number | null>>, setRefresh: Dispatch<SetStateAction<boolean>> }) => {
   const update = (id: number) => {
      openModal(true)
      setUpdateId(id)
   }

   const deleteHandler = () => {
      methodDelete(id)
      setRefresh(value => !value)
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
            <Button type="primary" size="large" onClick={deleteHandler}>
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