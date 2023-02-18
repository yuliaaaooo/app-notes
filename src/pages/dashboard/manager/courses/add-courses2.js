import { useState } from "react";
import { Button, Result, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import storage from "../../../../utils/storage";
import AddCourseForm from "../../../../components/course/add-course";
import UpdateChapterForm from "../../../../components/course/update-chapter";
const { Step } = Steps;

export const AddCourse = () => {
  //控制step从而知道是第几步，比如第一步的时候就隐藏2.3
  const [step, setStep] = useState(0);
  //<number[]>?
  const [availableNavigate, setAvailableNavigate] = useState([0]);
  const [courseId, setCourseId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const navigate = useNavigate();
  //cms：const userRole = useUserRole();
  const userRole = storage.userRole();
  const moveToNex = () => {
    setStep(step + 1);
    setAvailableNavigate([...availableNavigate, step + 1]);
  };
  const steps = [
    <AddCourseForm
      onSuccess={(course) => {
        setCourseId(course.id);
        setScheduleId(course.scheduleId);
        moveToNex();
      }}
    />,
    <UpdateChapterForm
      courseId={courseId}
      scheduleId={scheduleId}
      onSuccess={moveToNex}
    />,
    <Result
      status="success"
      title="Successfully Create Course!"
      extra={[
        <Button
          type="primary"
          key="detail"
          onClick={() => navigate(`/dashboard/${userRole}/courses/${courseId}`)}
          // !跳转后mirage状态丢失，新的的数据找不到，所以这里会报500
        >
          Go Course
        </Button>,
        <Button
          key="again"
          onClick={() => {
            router.reload();
          }}
        >
          Create Again
        </Button>,
      ]}
    />,
  ];

  return (
    <div>
      <Steps
        current={step}
        type="navigation"
        onChange={(current) => {
          if (availableNavigate.includes(current)) {
            setStep(current);
          }
        }}
        style={{ padding: "1em 1.6%", margin: "20px 0" }}
      >
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>

      {steps.map((content, index) => (
        <div key={index} style={{ display: index === step ? "block" : "none" }}>
          {content}
        </div>
      ))}
    </div>
  );
};
