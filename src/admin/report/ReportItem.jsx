import React from 'react'


const ReportItem = ({ report, chkItems, onSingleCheck }) => {
    const { report_code, report_content } = report;
  return (
    <tr>
        <td>
            <input
                onChange={(e) => onSingleCheck(report_code, e.target.checked)}
                checked={chkItems.includes(report_code) ? true : false}
                type="checkbox" style={{ width: '16px' }} />
        </td>
        <td style={{ width: '100px' }}>{report_code}</td>
        <td style={{ width: '800px' }}>{report_content}</td>
    </tr>
  )
}

export default ReportItem