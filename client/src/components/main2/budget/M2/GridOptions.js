export const COLUMNS = [
  {
    title: "Category",
    field: "category",
    type: "string"
  },
  {
    title: "Family",
    field: "family",
    type: "string"
  },
  {
    title: "Type",
    field: "type",
    type: "string"
  },
  {
    title: "Element",
    field: "element",
    type: "string"
  }
];

export const OPTIONS = {
  minimumColWidth: 10,
  expandAll: false,
  height: "100%",
  canSelect: true
};

// export const HANDLERS = {
//   onSelectRow(row) {
//     console.log(row);
//   }
// };

export const setData = (data, objectInfo, parentId = -1, index = 0) => {
  objectInfo.forEach(object => {
    // Changed map for forEach 25/3/2019
    switch (index) {
      case 0:
        data.push({ id: object.objectid, category: object.name });
        break;
      case 1:
        data.push({ id: object.objectid, family: object.name, parentId });
        break;
      case 2:
        data.push({ id: object.objectid, type: object.name, parentId });
        break;
      case 3:
        data.push({ id: object.objectid, element: object.name, parentId });
        break;
      default:
    }

    if (object.objects) {
      ++index;
      setData(data, object.objects, object.objectid, index);
      --index;
    }
  });
  return data;
};
