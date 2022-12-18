import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Header = ({history}) => {
  const {loginUser, setLoginUser} = useContext(UserContext);
  const onClick = (e) => {
		const href = e.target.getAttribute('href');
    console.log(href)
		history.push(href)
	}
  const onClickLogout = (e)=>{
		e.preventDefault();
		sessionStorage.removeItem('id');
    history.push('/admin');
  }
  const getLoginUser = async()=>{
		const result=await axios.get(`/user/userRead/${sessionStorage.getItem('id')}`);
		setLoginUser(result.data);
	}
	useEffect(()=>{
		if(sessionStorage.getItem('id')){
			getLoginUser();
		}
	},[sessionStorage.getItem('id')]);
		
  return (
    <div>
       <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" onClick={onClick}>Pollanet</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/user/userStatusWeb" onClick={onClick}>유저관리</Nav.Link>
            <Nav.Link href="/admin/mission/listTotal" onClick={onClick}>미션관리</Nav.Link>
            <Nav.Link href="/admin/board/list" onClick={onClick}>게시글관리</Nav.Link>
            <Nav.Link href="/admin/character/listTotal" onClick={onClick}>캐릭터관리</Nav.Link>
            {/* <Nav.Link href="/admin/comment/list" onClick={onClick}>댓글관리</Nav.Link> */}
            <Nav.Link href="/admin/report/list" onClick={onClick}>신고관리</Nav.Link>
          </Nav>
          <Nav>
          {sessionStorage.getItem('id') ? 
							<>
							<Nav.Link href={`/user/userRead/${sessionStorage.getItem('id')}`} onClick={onClick}>{sessionStorage.getItem('id')}님</Nav.Link>
							<Nav.Link href="/admin" onClick={onClickLogout}>LOGOUT</Nav.Link>
							</>
							 : 
							<Nav.Link href="/admin/login" onClick={onClick}>LOGIN</Nav.Link>
						}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default withRouter (Header)
