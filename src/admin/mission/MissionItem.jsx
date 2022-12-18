import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MissionItem = ({ mission, chkItems, onSingleCheck }) => {
    const { mission_code, m_start_Date, m_last_Date, m_category, m_image,
        m_title, m_info, m_content, m_content_image, m_target, m_result,
        m_get_point, m_user_id, m_sort } = mission;
    return (
        <tr>
            <td>
                <input
                    onChange={(e) => onSingleCheck(mission_code, e.target.checked)}
                    checked={chkItems.includes(mission_code) ? true : false}
                    type="checkbox" style={{ width: '16px' }} />
            </td>
            <td style={{ width: '100px' }}>{mission_code}</td>
            <td style={{ width: '100px' }}>{m_category}</td>
            <td style={{ width: '150px' }}>{m_sort}</td>
            <td style={{ width: '600px' }}><tr style={{ textAlign: 'left', paddingLeft: '20px' }}>{m_title}</tr></td>
            <td style={{ width: '100px' }}>{m_target}</td>
            <td style={{ width: '100px' }}>{m_result}</td>
            <td style={{ width: '100px' }}>{m_get_point}</td>
            <td style={{ width: '200px' }}><Button><Link to={`/admin/mission/read/${mission_code}`} style={{ textDecoration: 'none', color: 'inherit' }}>미션정보</Link></Button></td>
        </tr>
    )
}

export default MissionItem