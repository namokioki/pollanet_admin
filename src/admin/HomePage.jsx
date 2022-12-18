import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
const HomePage = ({history}) => {
    const id=sessionStorage.getItem('id')

    return (
        <div className='login'>
            <div className='login_box'>
                { sessionStorage.getItem('id') !== null ?
                <>
                <Card className='p-2'>
                    <Card.Body>
                        <Card.Title>{sessionStorage.getItem('id')} 님 안녕하세요!</Card.Title>
                        <Button onClick={()=>window.location.href = "/admin/user/userStatusWeb"}>유저관리</Button>
                        <Button onClick={()=>window.location.href = "/admin/board/listTotal"}>게시글 관리</Button>
                        <Button onClick={()=>window.location.href = "/admin/board/noticeList"}>공지사항 관리</Button>
                        <Button onClick={()=>window.location.href = "/admin/character/listTotal"}>캐릭터 관리</Button>
                    </Card.Body>
                </Card>
                </>
                :
                <>
                <Card className='p-2'>
                    <Card.Body>
                        <Card.Title>로그인을 진행해주세요!</Card.Title>
                        <Button onClick={()=>window.location.href = "/admin/login"}>로그인</Button>
                    </Card.Body>
                </Card>
                </>
                }
                
            </div>
        </div>
    )
}

export default HomePage
