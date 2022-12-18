import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const UserCommentItem = ({ comment, chkItems, onSingleCheck }) => {
        const { report_code,report_content,comment_code,
    c_user_id,c_register_Date,c_comment,c_del,c_report,
    c_update_Date,board_Code,c_recommend}= comment;
  return (
            <tr>
                <td>
                    <input
                        onChange={(e) => onSingleCheck(comment_code, e.target.checked)}
                        checked={chkItems.includes(comment_code) ? true : false}
                        type="checkbox" style={{ width: '16px' }} />
                </td>
                <td style={{ width: '50px' }}>{comment_code}</td>
                <td style={{ width: '100px' }}>
                <Dropdown as={ButtonGroup}>
          <Button variant="success">{c_user_id}</Button>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href={`/admin/comment/uclist/${c_user_id}`}>댓글보기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </td>
                <td style={{ width: '300px' }}>{c_register_Date}</td>
                <td style={{ width: '200px' }}>{c_comment}</td>
                <td style={{ width: '50px' }}>{c_del}</td>
                <td style={{ width: '50px' }}>{c_report}</td>
                <td style={{ width: '300px' }}>{c_update_Date}</td>
                <td style={{ width: '100px' }}>{board_Code}</td>
                <td style={{ width: '50px' }}>{c_recommend}</td>
                
            </tr>
  )
}

export default UserCommentItem