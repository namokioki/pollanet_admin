import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Accordion, Table } from 'react-bootstrap'

const CharacterRead = ({ match }) => {
    const character_code = match.params.character_code;
    const [characters, setCharacters] = useState('');

    const callCharacters = async () => {
        const result = await axios.get(`/character/read/${character_code}`);
        setCharacters(result.data);
        console.log(character_code)
    }

    useEffect(() => {
        callCharacters();
    }, []);
    return (
        <div>
            <div id="userlist">
                <h1 className='title'>캐릭터 정보</h1>
                <Table striped bordered hover striped="columns" className='my-3'>
                    <tbody>
                        <tr>
                            <td>No</td>
                            <td>{characters.character_code}</td>
                            <td>캐릭터이름</td>
                            <td>{characters.character_name}</td>
                            <td>캐릭터등급</td>
                            <td>{characters.character_grade}</td>
                        </tr>
                        <tr>
                            <td>캐릭터이미지</td>
                            <td><img src={`/display?fileName=${characters.character_image}`} style={{width:"200px"}}/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CharacterRead