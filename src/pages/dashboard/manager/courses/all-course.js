import { useListEffect } from "../../../../components/custom-hooks/list-effects";
import { Button, List, Spin } from "antd";
import Link from "antd/es/typography/Link";
import service from "../../../../service";
import InfiniteScroll from "react-infinite-scroll-component";
import storage from "../../../../utils/storage";
import CourseOverview from "../../../../components/course/overview";

export function ScrollMode() {
  //为什么要把api传进来呢！！！在这里request不行么
  const { paginator, setPaginator, hasMore, data } = useListEffect(
    service.getCourses.bind(service),
    "courses",
    false
  );

  return (
    <>
      {/* 必须要加这个和 */}
      <div
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 193px)",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          next={() => setPaginator({ ...paginator, page: paginator.page + 1 })}
          hasMore={hasMore}
          loader={
            <div
              style={{ position: "relative", left: "50%", marginTop: "10px" }}
            >
              <Spin size="large" />
            </div>
          }
          dataLength={data.length}
          endMessage={
            <div
              style={{ position: "relative", left: "50%", marginTop: "10px" }}
            >
              No More Course!
            </div>
          }
          // 对比了一下antd 还有这里要改一下才能滑动？？why
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden" }}
        >
          <List
            id="container"
            grid={{
              gutter: 14,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <CourseOverview {...item}>
                  <Link
                    to={`/dashboard/${storage.role}/courses/${item.id}`}
                    passHref
                  >
                    <Button type="primary">Read More</Button>
                  </Link>
                </CourseOverview>
              </List.Item>
            )}
          ></List>
        </InfiniteScroll>
      </div>
    </>
  );
}
