import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Card, Form, Button, Nav, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserBoardItem from './UserBoardItem';
import UserMissionItem from './UserMissionItem';

const UserRead = ({ match }) => {
    const user_id = match.params.user_id;
    const [boards, setBoards] = useState([]);
    const [missions, setMissions] = useState([]);
    const [users, setUsers] = useState('');
    const [viewBoard, setviewBoard] = useState(true);
    const [viewMission, setViewMission] = useState(false);

    const callUser = async () => {
        const result = await axios.get(`/user/userReadSt/${user_id}`);
        setUsers(result.data);
    }

    const callBoard = async () => {
        const result = await axios.get(`/board/userBoardList/${user_id}?page=1&num=5`)
        setBoards(result.data);
    }
    const callMission = async () => {
        const result = await axios.get(`/umission/userMissionList/${user_id}?um_start=1&um_number=5`)
        setMissions(result.data);
    }

    const { name, nickName, tel, email, character_sort,
        address, admin_Code, register_Date, attendance,
        attendance_Date, user_del, user_black } = users;

    const onVisibleBoard = () => {
        setviewBoard(true)
        setViewMission(false)
    }

    const onVisibleCMission = () => {
        setviewBoard(false)
        setViewMission(true)
    }

    useEffect(() => {
        callUser();
        callBoard();
        callMission();
    }, []);

    if (!users) return <h1>Loading...</h1>

    return (
        <div id="userlist">
            <h1 className='title'>유저 정보</h1>
            <Table striped bordered hover striped="columns" className='my-3'>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>{user_id}</td>
                        <td>이름</td>
                        <td>{name}</td>
                        <td>가입일</td>
                        <td>{register_Date}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{email}</td>
                        <td>닉네임</td>
                        <td>{nickName}</td>
                        <td>전화번호</td>
                        <td>{tel}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{address}</td>
                        <td>회원정지</td>
                        <td>{user_black}</td>
                        <td>회원탈퇴</td>
                        <td>{user_del}</td>
                    </tr>
                    <tr>
                        <td colSpan={4} onClick={onVisibleBoard}>{viewBoard ? '게시글 닫기' : '게시글 보기'}</td>

                        <td colSpan={3} onClick={onVisibleCMission}>{viewMission ? '미션 닫기' : '미션 보기'}</td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
            </Table>
            <div>
            {viewBoard &&
          <>
            <h1 className='header_title'>
              추천 많이 받은 게시물
            </h1>
            <div className='list_box'>
              <Card className='p-2'>
                <Link to={`/admin/board/userBoardList/${user_id}`}>
                  <Button style={{float : 'right'}}>게시글 더보기</Button>
                </Link>
              </Card>
              <table className='user_board_table'>
                <thead className='ubt_header'>
                  <tr>
                    <th style={{ width: "800px" }}>게시글 제목</th>
                    <th style={{ width: "300px" }}>작성일</th>
                    <th style={{ width: "150px" }}>추천수</th>
                    <th style={{ width: "150px" }}>댓글수</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.length === 0 ?
                    <tr>
                      <td className='none' colSpan={4}> 작성한 게시글이 없습니다!</td>
                    </tr>
                    :
                    boards.map(board =>
                      <UserBoardItem key={board.board_code} board={board} />
                    )}
                </tbody>
              </table>
            </div>
          </>
        }
        {viewMission &&
          <>
            <h1 className='header_title'>
              최근 미션 목록
            </h1>
            <div className='list_box'>
              <table className='user_board_table'>
                <thead className='ubt_header'>
                  <tr>
                    <th style={{ width: "150px" }}>카테고리</th>
                    <th style={{ width: "800px" }}>미션</th>
                    <th style={{ width: "300px" }}>완료일</th>
                    <th style={{ width: "150px" }}>포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {missions.length === 0 ?
                    <tr>
                      <td className='none' colSpan={4}> 최근 수행한 미션이 없습니다!</td>
                    </tr>
                    :
                    missions.map(mission =>
                      <UserMissionItem key={mission.user_mission_code} mission={mission} />
                    )}
                </tbody>
              </table>
            </div>
          </>
        }
            </div>
        </div>
    )
}

export default UserRead
