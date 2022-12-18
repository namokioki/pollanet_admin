import ListGroup from 'react-bootstrap/ListGroup';
import { Route, withRouter } from 'react-router-dom';
import UserComment from './UserComment';
import UserCommentList from './UserCommentList';
import UserCommentRead from './UserCommentRead';



const UserCommentPage = () => {
  return (
    <div id='user'>
      <h1 className='title'>댓글 목록</h1>
      <div className='u_page'>
        <div className='u_nav'>
          <h3 className='nav_title'>댓글 관리</h3>
          <ListGroup>
            <ListGroup.Item action href="/admin/comment/list">댓글목록</ListGroup.Item>
            <ListGroup.Item action href="/admin/comment/read">댓글관리</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <Route path="/admin/comment/list" component={UserComment} />
      <Route path="/admin/comment/read" component={UserCommentRead} />
      <Route path="/admin/comment/uclist/:c_user_id" component={UserCommentList} />

    </div>
  )
}

export default withRouter (UserCommentPage)