import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Button, List, Spin } from "antd";
import service from "../../../../service";
import CourseOverview from "./overview";

// export const Indicator = styled.div`
//   position: relative;
//   left: 50%,
//   margin-top: 10px;
//   transform: translateX(50%);
// `;

export const ScrollMode = () => {
  const [paginator, setpaginator] = useState({ limit: 20, page: 1 });
  const [hasMore, sethasMore] = useState(true);
  const data = async () => {
    const params = { ...paginator };
    const res = await service.getStudents(params);
    return res.student;
  };

  return (
    <div>
      <InfiniteScroll
        next={() => console.log("111")}
        // setpaginator({ ...paginator, page: paginator.page + 1 })
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        dataLength={data.length} //This is important field to render the next data
        endMessage={<a>No More Course!</a>}
        scrollableTarget="contentLayout"
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
                {/* <Link
                  href={`/dashboard/${storage.role}/courses/${item.id}`}
                  passHref
                >
                  <Button type="primary">Read More</Button>
                </Link> */}
              </CourseOverview>
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};
