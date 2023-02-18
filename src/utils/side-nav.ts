/**
 * 判断当前路径是否指向一个详情页
 */
const isDetailPath = (path: string): boolean => {
  const paths = path.split("/");
  const length = paths.length;
  const last = paths[length - 1];
  const reg = /\[.*\]/;

  return reg.test(last);
};
