import React from 'react'
import Table from 'react-bootstrap/Table';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ReportItem from './ReportItem';


const ReportList = () => {
    const [reports, setReports] = useState();
    const [chkItems, setChkItems] = useState([]);

    const callAPI = async () => {
        const result = await axios.get('/report/list');
        setReports(result.data);
    }

    const onAllCheck = (checked) => {
        if (checked) {
            const all = [];
            reports.forEach(reports => all.push(reports.report_code));
            setChkItems(all);
        } else {
            setChkItems([]);
        }
    }

    const onSingleCheck = (report_code, checked) => {
        if (checked) {
            setChkItems(chkItems.concat(report_code));
        } else {
            setChkItems(chkItems.filter(item => item !== report_code));
        }
    }

    useEffect(() => {
        callAPI();
    }, []);
    if (!reports) return <h1>Loading...</h1>
  return (
    <div id='userlist'>
            <Card className='p-2 my-3' style={{ width: '100%' }}>
                <Form style={{ float: 'left' }}>
                    <Button variant="dark" style={{ float: 'right', marginRight: '10px' }}> Search</Button>
                    <Form.Control
                        style={{ width: "30%" }}
                        id="search_box"
                        type="search"
                        placeholder="신고사유"
                        className="me-2"
                        aria-label="Search" />
                    <Button variant="light" style={{ float: 'right', marginRight: '10px' }}>
                        신고목록 <Badge bg="primary"></Badge>
                        <span className="visually-hidden">report</span>
                    </Button>
                </Form>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width : "100px"}}>
                            <input type="checkbox"
                                checked={chkItems.length === reports.length ? true : false}
                                onChange={(e) => onAllCheck(e.target.checked)} />
                        </th>
                        <th>No</th>
                        <th>신고사유</th>

                    </tr>
                </thead>
                <tbody>
                    {reports.map(report =>
                        <ReportItem key={report.report_code} report={report} chkItems={chkItems} onSingleCheck={onSingleCheck} />
                    )}
                </tbody>
            </Table>
        </div>
  )
}

export default ReportList