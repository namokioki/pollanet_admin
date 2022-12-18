import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Table } from 'react-bootstrap'

const MissionRead = ({match}) => {
     const mission_code = match.params.mission_code;
    const [mission, setMission] = useState('');
    const { m_start_Date, m_last_Date, m_category, m_image,
        m_title, m_info, m_content, m_content_image, m_target, m_result,
        m_get_point, m_user_id, m_sort,m_info_image } = mission;

         const callAPI = async () => {
        const result = await axios.get(`/mission/read/${mission_code}`);
        setMission(result.data);
    }
    useEffect(() => {
        callAPI();
    }, []);

    if (!mission) return <h1>Loading...</h1>
    return (
        <div>
            <div id="userlist">
                <h1 className='title'>미션 정보</h1>
                <Table striped bordered hover striped="columns" className='my-3'>
                    <tbody>
                        <tr>
                            <td>작성자</td>
                            <td>{m_user_id}</td>
                            <td>미션이름</td>
                            <td>{m_title}</td>
                            <td>주간/일간</td>
                            <td>{m_sort}</td>
                        </tr>
                        <tr>
                            <td>목표인원</td>
                            <td>{m_target}</td>
                            <td>참여인원</td>
                            <td>{m_result}</td>
                            <td>포인트</td>
                            <td>{m_get_point}</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>{m_info}</td>
                            <td>시작일</td>
                            <td>{m_start_Date}</td>
                            <td>종료일</td>
                            <td>{m_last_Date}</td>
                        </tr>
                        <tr>
                            <td>배너이미지</td>
                            <td><img src={`/display?fileName=${m_image}`} style={{width : "200px"}}/></td>
                            <td>모바일 이미지</td>
                            <td><img src={`/display?fileName=${m_content_image}`} style={{width : "200px"}}/></td>
                        </tr>
                    </tbody>
                </Table>
                <Card className='m-3 p-3'>
                    정보 이미지
                    <img src={`/display?fileName=${m_info_image}`} style={{width : "50%"}}/>
                </Card>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>내용보기</Accordion.Header>
                        <Accordion.Body>
                            {m_content}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            {/* <Link to={`/mission/`}>
                <Button>수정하기</Button>
            </Link> */}
        </div>
    )
}

export default MissionRead
