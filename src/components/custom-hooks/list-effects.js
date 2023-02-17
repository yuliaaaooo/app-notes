import { omitBy } from "lodash";
import { useCallback, useEffect, useState } from "react";

export function useListEffect(
  // 执行函数 输入一个请求 输出一个响应
  apiFn,
  //想看sourcekey是干嘛的就继续往下搜索一下
  sourceKey,
  onlyFresh = true,
  params = null
) {
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState({ limit: 20, page: 1 });
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  //我提问：为什么要用useCallback？“因为不用的话每次会生成新的变量 会导致重新渲染 但这里是不存在这个问题的 用了只是为了规范性的问题“
  //request接收一个参数 如果参数变化的话 他会重新渲染 比如： 父组件参数变化了 做一个浅比较 子组件也要重新渲染（但state跟子组件无关）
  //useCallback，在父组件中只有deps变化的时候，子组件才会跟着变化
  //这里没什么必要，因为这里也没有传给子组件，他这么写是为了规范
  const request = useCallback(apiFn, []);
  const stringParams = JSON.stringify(params || {});
  //这里做一个监听
  useEffect(() => {
    //这里应该是个lodash的东西，挑选参数
    const req = omitBy(
      //前面是参数
      { ...paginator, ...(params || {}) },
      // 后面是挑选，满足的话就omit掉
      (item) => item === "" || item === null
    );
    setLoading(true);
    request(req).then((res) => {
      //什么时候是:重命名
      const { data: newData } = res;
      console.log(newData, "newData"); //为什么是undefined呢
      //取对象的属性 如‘course’
      const fresh = newData[sourceKey];
      //这里做的是数据的合并
      //onlyFresh参数：是的话只有新数据无老数据，否的话就新老数据合并
      const source = onlyFresh ? fresh : [...data, ...fresh];
      setData(source);
      setTotal(newData.total);
      setHasMore(
        onlyFresh
          ? !!source.length && source.length < newData.total
          : newData.total > source.length
      );
      setLoading(false);
    });
    //如果这里paginator变化的话，就重新请求 （page=2的时候请求page=2的数据）
  }, [paginator, stringParams]);

  return {
    data,
    hasMore,
    paginator,
    total,
    loading,
    setPaginator,
    setData,
    setTotal,
    setLoading,
  };
}
