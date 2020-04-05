import React, {Fragment} from "react";
import {Table} from "semantic-ui-react";

const AdmissionTypePanel = () => (
    <Fragment>
        <Table celled padded>
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell>
                        Active <br/>
                        100 <br/> 5%
                    </Table.Cell>
                    <Table.Cell>
                        เรียนดี <br/>
                        100 <br/> 5%
                    </Table.Cell>
                    <Table.Cell>
                        ทุนเพชร <br/>
                        100 <br/> 5%
                    </Table.Cell>
                    <Table.Cell>
                        ปวช. <br/>
                        100 <br/> 5%
                    </Table.Cell>
                    <Table.Cell>
                        Tcas. <br/>
                        100 <br/> 5%
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Fragment>
)

export default AdmissionTypePanel