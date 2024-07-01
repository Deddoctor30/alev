
const Table = ({ data }: { data: object[] }) => {
   
   const dataSource = [
      {
         key: tep?.id,
         landArea: tep?.landArea,
         buildArea: tep?.buildArea,
         floorsAbove: tep?.floorsAbove,
         floorsBelow: tep?.floorsBelow,
         liveArea: tep?.liveArea,
         commerceArea: tep?.commerceArea,
         apartmentsCount: tep?.apartmentsCount,
         mopCount: tep?.mopCount,
      }
   ];

   const columns = [
      {
         title: 'Площадь участка',
         dataIndex: 'landArea',
         key: 'landArea',
      },
      {
         title: 'Площадь застройки',
         dataIndex: 'buildArea',
         key: 'buildArea',
      },
      {
         title: 'Этажность надземная',
         dataIndex: 'floorsAbove',
         key: 'floorsAbove',
      },
      {
         title: 'Этажность подземная',
         dataIndex: 'floorsBelow',
         key: 'floorsBelow',
      },
      {
         title: 'Жилая площадь квартир',
         dataIndex: 'liveArea',
         key: 'liveArea',
      },
      {
         title: 'Площадь коммерческих помещений',
         dataIndex: 'commerceArea',
         key: 'commerceArea',
      },
      {
         title: 'Количество квартир',
         dataIndex: 'apartmentsCount',
         key: 'apartmentsCount',
      },
      {
         title: 'Площадь МОП',
         dataIndex: 'mopCount',
         key: 'mopCount',
      },
   ];
  return (
      <Table pagination={false} dataSource={dataSource} columns={columns} />
  )
}

export default Table