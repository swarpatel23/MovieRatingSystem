import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

function Login (){
    
    useEffect(() => {
        document.title = "Login In";                
    })
    const onFinish = values => {
        console.log('Success:', values);
        axios.post("/api/login", values).then(response => {
            console.log(response)
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            //window.location.reload(false);
            window.location = "/";

        }).catch(error => {
            console.log(error.response)
            let Error = error.response.data
            console.log(Error);
            //localStorage.setItem('isLoggedIn', undefined)
        })
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div className="center-container">
        <div className="center-container-div">
            <div style={{textAlign: "center", paddingBottom: 10}}>
                <h1>Sign In</h1>
            </div>
                    <Form
            {...layout}
            name="login"
            initialValues={{ remember: true }}
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
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!'}]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Login In
                </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
            <Link to="/SignUp" >Register here</Link>
            </Form.Item>
            </Form> 
        </div>
    </div>
    )
}

export default Login;