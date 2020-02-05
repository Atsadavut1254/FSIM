import React from 'react'
import ReactDOM from 'react-dom';
import SearchActivity from './SearchActivity'
import AddActivity from './AddActivity'
import { Container, Nav, Button, Tab } from 'react-bootstrap';

class add_activity extends React.Component {

    state = {
        key: 'SearchActivity',
    }
    handleSelect = (selectedtab) => {
        this.setState({ key: selectedtab });
    }
    render() {
        return (
            <React.Fragment>
                <Container className="contrain_css" >
                    <h3 style={{ marginBottom: '5%' }}>จัดการข้อมูลกิจกรรมรับเข้า</h3>
                    <Tab.Container defaultActiveKey="SearchActivity" >
                        <Nav fill variant="tabs" activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}
                        >
                            <Nav.Item >
                                <Nav.Link
                                    eventKey="SearchActivity">ดูข้อมูลกิจกรรมรับเข้า</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="Tab2">
                                <Nav.Link className="Tab2-text" eventKey="AddActivity" >เพิ่มข้อมูลกิจกรรมรับเข้า</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='TabContent' >
                            <Tab.Pane eventKey="SearchActivity" >
                                <SearchActivity />
                            </Tab.Pane>
                            <Tab.Pane eventKey="AddActivity">
                                <AddActivity />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </React.Fragment>

        )
    }
}

export default add_activity