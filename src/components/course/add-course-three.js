import { Button, Result } from 'antd';

export default () => {


    return (
        <Result
            status="success"
            title="Successfully Create Course!"
            extra={[
                <Button type="primary" key="console">
                    Go Course
                </Button>,
                <Button key="buy">Create Again</Button>,
            ]}
        />
    );
};
