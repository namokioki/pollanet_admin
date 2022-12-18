import axios from 'axios'
import React, { useState } from 'react'
import { Card, Form, Row, Button, Col } from 'react-bootstrap'

const CharacterInsert = ({history}) => {
    const [form, setForm] = useState({
        character_name: '',
        character_grade: '',
        file: null,
      })
      const { character_code, character_name, character_grade, file } = form;
      const onChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
      const onChangeFile = (e) => {
        setForm({
          ...form,
          file: e.target.files[0],
        })
      }
      const onSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm('등록하실래요?')) return;
        const formData = new FormData();
        formData.append("character_name", character_name);
        formData.append("character_grade", character_grade);
        formData.append("file", file);
        await axios.post('/character/insert', formData)
        alert('등록했습니다!')
        history.push('/admin/character/listTotal');
      }
  return (
    <div>
      <div id="userlist">
        <h1 className='title'>캐릭터 등록</h1>
        <Card className='my-3 p-3' style={{ textAlign: 'left' }}>

          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column sm="2">캐릭터명</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={character_name}
                  placeholder="캐릭터 이름"
                  onChange={onChange}
                  name="character_name"
                />
              </Col>
              <Form.Label column sm="2">캐릭터등급</Form.Label>
              <Col sm="4">
                <Form.Control
                  value={character_grade}
                  placeholder="캐릭터 등급"
                  onChange={onChange}
                  name="character_grade"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm="2">이미지</Form.Label>
              <Col sm="10">
              <Form.Control type="file" onChange={onChangeFile} name="file" style={{ width: "50%" }} />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" style={{ float: 'right', marginLeft: '10px' }}>
              등록하기
            </Button>
            <Button variant="primary" type="submit" style={{ float: 'right', marginLeft: '10px' }}>
              취소
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default CharacterInsert