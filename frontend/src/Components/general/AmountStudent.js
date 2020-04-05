import React, {Fragment} from "react";
import {Header, Grid, Card} from "semantic-ui-react";

const AmountStudent = () => (
    <Fragment>
        <Grid columns={4}>
            <Grid.Row>
                <Grid.Column>
                    <Card className="card-count">100</Card>
                </Grid.Column>
                <Grid.Column>
                    <Card className="card-count">100</Card>
                </Grid.Column>
                <Grid.Column>
                    <Card className="card-count">100</Card>
                </Grid.Column>
                <Grid.Column>
                    <Card className="card-count">100</Card>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h5">ทั้งหมด</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5">สูงสุด</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5">ต่ำสุด</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header as="h5">ค่าเฉลี่ย</Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Fragment>
)

export default AmountStudent