import React from 'react'
import Table from 'react-bootstrap/Table';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CharacterItem from './CharacterItem';

const CharacterList = () => {
    const [characters, setCharacters] = useState();
    const [chkItems, setChkItems] = useState([]);

    const callAPI = async () => {
        const result = await axios.get('/character/list');
        setCharacters(result.data);
    }

    const onAllCheck = (checked) => {
        if (checked) {
            const all = [];
            characters.forEach(characters => all.push(characters.character_code));
            setChkItems(all);
        } else {
            setChkItems([]);
        }
    }

    const onSingleCheck = (character_code, checked) => {
        if (checked) {
            setChkItems(chkItems.concat(character_code));
        } else {
            setChkItems(chkItems.filter(item => item !== character_code));
        }
    }

    useEffect(() => {
        callAPI();
    }, []);

    if (!characters) return <h1>Loading...</h1>

    return (
        <div id='userlist'>
            <Card className='p-2 my-3' style={{ width: '100%' }}>
                <Form style={{ float: 'left' }}>
                    <Button variant="dark" style={{ float: 'right', marginRight: '10px' }}> Search</Button>
                    <Form.Control
                        style={{ width: "30%" }}
                        id="search_box"
                        type="search"
                        placeholder="캐릭터이름"
                        className="me-2"
                        aria-label="Search" />
                    <Button variant="light" style={{ float: 'right', marginRight: '10px' }}>
                        캐릭터수 <Badge bg="primary"></Badge>
                        <span className="visually-hidden">messages</span>
                    </Button>
                </Form>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox"
                                checked={chkItems.length === characters.length ? true : false}
                                onChange={(e) => onAllCheck(e.target.checked)} />
                        </th>
                        <th style={{width:"100px"}}>No</th>
                        <th style={{width:"300px"}}>캐릭터명</th>
                        <th style={{width:"500px"}}>캐릭터이미지</th>
                        <th style={{width:"200px"}}>캐릭터등급</th>
                        <th style={{width:"200px"}}>캐릭터정보</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(character =>
                        <CharacterItem key={character.character_code} character={character} chkItems={chkItems} onSingleCheck={onSingleCheck} />
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CharacterList