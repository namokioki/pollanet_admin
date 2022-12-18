import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CharacterItem = ({ character, chkItems, onSingleCheck }) => {
  const { character_code, character_name, character_image, character_grade } = character;
  return (
    <tr style={{textAlign:"center", verticalAlign:"middle"}}>
        <td >
            <input
                onChange={(e) => onSingleCheck(character_code, e.target.checked)}
                checked={chkItems.includes(character_code) ? true : false}
                type="checkbox" style={{ width: '16px' }} />
        </td>
        <td style={{ width: '100px' }}>{character_code}</td>
        <td style={{ width: '150px' }}>{character_name}</td>
        <td style={{ width: '150px' }}><img src={`/display?fileName=${character_image}`} style={{width:"200px"}}/></td>
        <td style={{ width: '150px' }}>{character_grade}</td>
        
        <td ><Button><Link to={`/admin/character/read/${character_grade}`} style={{ textDecoration: 'none', color: 'inherit' }}>캐릭터정보보기</Link></Button></td>

    </tr>
  )
}

export default CharacterItem