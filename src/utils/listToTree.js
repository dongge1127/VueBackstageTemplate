// const listToTree = function (
//   list,
//   id = "id",
//   parentId = "pid",
//   children = "children"
// ) {
//   const arr = JSON.parse(JSON.stringify(list));
//   if (!Array.isArray(arr) || !arr.length) return;
//   const map = {};
//   arr.forEach((item) => {
//     map[item[id]] = item;
//   });
//
//   const roots = [];
//   arr.forEach((item) => {
//     const parent = map[item[parentId]];
//     if (parent) {
//       (parent[children] || (parent[children] = [])).push(item);
//     } else {
//       roots.push(item);
//     }
//   });
//
//   return roots;
// };
//
// export { listToTree };

// 列表转树接口
export function listToTree(
  list = [],
  parentId = "parentId",
  children = "children"
) {
  if (list && list.length) {
    const treeListMap = new Map();
    list.forEach((item) => {
      treeListMap.set(item.id, item);
    });
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const parent = treeListMap.get(item[parentId]);
      if (parent) {
        if (!parent[children]) parent[children] = [];
        parent[children].push(item);
        list.splice(i, 1);
        i--;
      }
    }
    return list;
  } else {
    return [];
  }
}
