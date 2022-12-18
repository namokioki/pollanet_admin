import React, { useContext, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const LoginPage = ({ history }) => {
    const { setLoginUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        id: '',
        password: ''
    })
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.id === '' || form.password === '') {
            setMessage('입력하지 않은 항목이 있습니다!')
            return;
        }
        const result = await axios.post('/user/userLogin', {id:form.id,password:form.password});
        console.log(form.id)
        console.log(form.password)
        if (result.data === 0) {
            setMessage('해당 아이디가 존재하지 않습니다.')
        } else if (result.data === 2) {
            setMessage('비밀번호가 일치하지 않습니다.')
        } else {
            sessionStorage.setItem('id', form.id);
            alert('로그인되었습니다.');
            history.push('/')
        }
    }

    return (
        <div className='login'>
            <div className='login_box'>
                <Card className='p-2'>
                    <Form style={{ textAlign: 'left' }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control onChange={onChange} value={form.id} name="id" type="text" placeholder="아이디" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control onChange={onChange} value={form.password} name="password" type="password" placeholder="비밀번호" />
                        </Form.Group>
                        {message &&
                            <Alert key="primary" variant='primary' className='m-3'>
                                {message}
                            </Alert>
                        }
                        <Button variant="primary" onClick={onSubmit}>
                            로그인
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
export default LoginPage
