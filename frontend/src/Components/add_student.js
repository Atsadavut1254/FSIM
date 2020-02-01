import React from 'react'
import Index from "./Index";
import ReactDOM from 'react-dom';
import SearchNewStudent from './SearchNewStudent'
import { Container, Nav, Row, Col, Tab } from 'react-bootstrap';

class add_student extends React.Component {

	state = {
		key: 'SearchNewStudent'
	}
	handleSelect = (selectedtab) => {
		this.setState({ key: selectedtab });
	}
	render() {
		return (
			<React.Fragment>

			<Container id="H100" style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: '5%' }}>
				<h3  style={{marginBottom:'5%'}} >จัดการข้อมูลนักศึกษา</h3>
				<Tab.Container defaultActiveKey="SearchNewStudent">
					<Nav fill variant="tabs" activeKey={this.state.activeKey}
						onSelect={this.handleSelect} >
						<Nav.Item >
							<Nav.Link
								eventKey="SearchNewStudent"  >ดูข้อมูลนักศึกษารับเข้า</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="AddNewStudent" >เพิ่มข้อมูลนักศึกษารับเข้า</Nav.Link>
						</Nav.Item>
					</Nav>

					<Tab.Content >
						<Tab.Pane eventKey="SearchNewStudent">
							<SearchNewStudent />
						</Tab.Pane>
						<Tab.Pane eventKey="AddNewStudent">
							<Index />
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>

			</Container>

			</React.Fragment>

		)
	}
}

export default add_student