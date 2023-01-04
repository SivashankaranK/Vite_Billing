import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { customerListRequest } from "../../reducers";
import { Col, Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../components';
import { ICustomTableColumn } from '../../types/custom-table';
import { ICustomerResponse } from '../../types';

const Customers = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(customerListRequest())
    }, [])

    const headerColumns: ICustomTableColumn[] = [
        { label: "Id", identifier: "id", type: 'number', visible: false },
        { label: "Name", identifier: "name", type: 'string', visible: true },
        { label: "Mobile Number", identifier: "mobileNumber", type: 'number', visible: true },
    ];

    const customersData: ICustomerResponse[] = [
        {
            id: 1,
            name: "Aximsoft India PVT LTD",
            mobileNumber: 7904172088
        },
        {
            id: 2,
            name: "Aximsoft India PVT",
            mobileNumber: 7904172088
        },
        {
            id: 3,
            name: "Aximsoft India",
            mobileNumber: 7904172088
        },
        {
            id: 4,
            name: "Aximsoft",
            mobileNumber: 7904172088
        }
    ]

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customers</h3>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomTable data={customersData} headers={headerColumns} />
                </Col>
            </Row>
        </Container>
    )
}

export default Customers;