import React from 'react'

const BoardCommentItem = ({ comment }) => {
    const { c_register_Date, c_comment, c_del, c_report, c_update_Date, board_Code, c_recommend, comment_code, c_user_id } = comment;
    return (
        <div className='comment_box'>
            {c_del === '0' ?
                <>
                    <div>
                        <div className='comment_info'>
                            <span className='comment_id'>{c_user_id}</span>
                            {c_register_Date !== c_update_Date ?
                                <><span className='comment_date'>{c_update_Date}</span> <span className='comment_date'>(수정됨)</span></> :
                                <span className='comment_date'>{c_update_Date}</span>
                            }
                            <span className='recommend'>추천수 : {c_recommend} 개</span>
                            <span className='recommend'>신고수 : {c_report} 개</span>
                        </div>
                        <div >
                            <p className='comment_content'>{c_comment}</p>
                        </div>
                    </div>
                </>
                : <div>삭제된 댓글 입니다</div>
            }
        </div>
    )
}

export default BoardCommentItem