import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

function SignUp (){
    useEffect(() => {
        document.title = "Sign Up";                
    })
    const onFinish = values => {
        console.log('Success:', values);        
        axios.post("/api/register", values).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div className="center-container">
        <div className="center-container-div ">
            <div style={{textAlign: "center", paddingBottom: 10}}>
                <h1>Register Now</h1>
            </div>
                    <Form
            {...layout}
            name="login"            
            onFinish={onFinish}
            hideRequiredMark={true}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!'}]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!'}]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!'}]}
            >
                <Input.Password />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Sign Up
                </Button>
            </Form.Item>
            </Form> 
        </div>
    </div>
    )
}

export default SignUp;
//SignUp