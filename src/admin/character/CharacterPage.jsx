import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Route, withRouter } from 'react-router-dom';
import CharacterInsert from './CharacterInsert';
import CharacterList from './CharacterList';
import CharacterRead from './CharacterRead';

const CharacterPage = () => {
  return (
    <div id='user'>
    <h1 className='title'>캐릭터 목록</h1>
    <div className='u_page'>
        <div className='u_nav'>
            <h3 className='nav_title'>캐릭터관리</h3>
            <ListGroup>
                <ListGroup.Item action href="/admin/character/listTotal">캐릭터목록</ListGroup.Item>
                <ListGroup.Item action href="/admin/character/insert">캐릭터등록</ListGroup.Item>
            </ListGroup>
        </div>
    </div>
    <Route path="/admin/character/listTotal" component={CharacterList}/>
    <Route path="/admin/character/read/:character_code" component={CharacterRead}/>
    <Route path="/admin/character/insert" component={CharacterInsert}/>
</div>

  )
}

export default withRouter (CharacterPage)