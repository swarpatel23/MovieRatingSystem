import React,{useState} from 'react'
import {List, Rate, BackTop, Modal, Button, Form, Input} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
const ReviewComp = ({mid,list,triggerParentUpdate})=>{
    console.log('list', list)
    console.log('mid',mid)
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
      };

    const handleCancel = e => {        
        setVisible(false);
      };
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      const onFinish = values => {
        setVisible(false);
        console.log('Success:', values);        
        if(values.stars===undefined){
            values.stars = 0;
        }
        else{
            values.stars *= 2;
        }        
        let postvalues = {mid:mid, values:values}
        axios.post("/api/PostReview", postvalues).then(response => {
           // triggerParentUpdate();
            console.log(response);
            triggerParentUpdate();
            
        }).catch(error => {
            console.log(error.response)
            let Error = error.response.data
            console.log(Error);            
        })        
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div>
            <Button onClick={showModal} 
            type="primary" shape="round" icon={<EditOutlined />}
            style={{marginTop:"1em"}}
            >Write Review
            </Button>                     
            <Modal
          title="Share Your View"
          visible={visible}          
          onCancel={handleCancel}
          footer={null}
        >           <Form
        {...layout}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        hideRequiredMark={true}
        onFinishFailed={onFinishFailed}
        >               
            <Form.Item
                label="Review Heading"
                name="title"
                rules={[{ required: true, message: 'Please input your Review Heading !'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Your View"
                name="content"
                rules={[{ required: true, message: 'Please input your view!'}]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                label="Stars"
                name="stars"
                rules={[{ required: false}]}
            >
                <Rate allowHalf />
            </Form.Item>            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Share
                </Button>
            </Form.Item>
            </Form> 
        </Modal>        
           <List
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    
                    title={                        
                        <>
                            <h3>
                                {item.heading}
                                <Rate disabled value={item.imdb_rating} style={{float:"right"}}/>
                            </h3>                                                                                                          
                        </>
                    }
                    description={item.review}
                    />
                </List.Item>
                )}
            />
            <BackTop/>
        </div>
    )
}
export default ReviewComp;