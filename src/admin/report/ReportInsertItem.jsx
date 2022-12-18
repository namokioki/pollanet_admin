import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReportInsertItem = ({ board, chkItems, onSingleCheck }) => {
  const { board_code, b_user_id, b_register_Date, b_update_Date, b_title,
    b_content, b_image, b_del, b_report, b_recommend, b_comment_count,
    b_report_content } = board;

  return (
    <tr>
      <td>
        <input
          onChange={(e) => onSingleCheck(board_code, e.target.checked)}
          checked={chkItems.includes(board_code) ? true : false}
          type="checkbox" style={{ width: '50px' }} />
      </td>
      <td style={{ width: '70px' }}>{board_code}</td>
      
        <td style={{ width: '600px' }}><Link to={`/admin/board/read/${board_code}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'left' }}>{b_title}</Link></td>
      
      <td style={{ width: '150px' }}>
        <Dropdown as={ButtonGroup}>
          <Button variant="success">{b_user_id}</Button>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href={`/admin/board/userBoardList/${b_user_id}`}>게시글보기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <td style={{ width: '300px' }}>{b_register_Date}</td>
      <td style={{ width: '70px' }}>{b_del}</td>
      <td style={{ width: '70px' }}>{b_report}</td>
      <td style={{ width: '70px' }}>{b_comment_count}</td>
      <td style={{ width: '70px' }}>{b_recommend}</td>
    </tr>
  )
}

export default ReportInsertItem