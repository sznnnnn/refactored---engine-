export const equipmentTypes = [
  {
    id: 1,
    name: '装载机'
  },
  {
    id: 2,
    name: '挖掘机'
  },
  {
    id: 3,
    name: '压路机'
  },
  {
    id: 4,
    name: '轮式挖掘机'
  },
  {
    id: 5,
    name: '小型装载机'
  }
];

// 根据ID获取设备类型名称
export const getEquipmentTypeName = (id) => {
  const equipment = equipmentTypes.find(item => item.id === id);
  return equipment ? equipment.name : '';
}; 