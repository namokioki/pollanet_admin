import React from 'react'

const UserMissionItem = ({ mission }) => {
    const { m_category, m_title, um_get_point, um_register_Date, m_sort } = mission
    const category = {
        'd': '일일미션',
        'w': '주간미션'
    }
    return (
        <tr>
            <td className='uri_td'>{category[m_sort]}</td>
            <td className='uri_td'>{m_title}</td>
            <td className='uri_td'>{um_register_Date}</td>
            <td className='uri_td'>{um_get_point} 점</td>
        </tr>
    )
}

export default UserMissionItem