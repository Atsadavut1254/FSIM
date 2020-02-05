
import React from 'react'
import ProductRow from './ProjrctRow'
import { Form, Col, Row, Button, Container } from 'react-bootstrap';


class ProjectTable extends React.Component {

    render() {
        let onProductTableUpdate = this.props.onProductTableUpdate;
        let rowDel = this.props.onRowDel;
        let rowAdd =this.props.onRowAdd;
        let count=this.props.count;
        let product = this.props.products.map(function (product) {
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} onAddEve={rowAdd} count={count}/>)
        });
        return (
            <React.Fragment>
                    {product} 
            </React.Fragment>
        );

    }

}

export default ProjectTable;