import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'

const AmountBox = ({ name, id, amount }) => {
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{amount} <span>คน</span></Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default AmountBox