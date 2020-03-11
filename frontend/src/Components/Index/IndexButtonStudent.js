import React, { Component } from 'react'
import {
    Header,
    Grid,
    Image,
    Button
} from "semantic-ui-react";


class IndexButtonStudent extends Component {
    onClick(){
        this.props.onClick(this.props.item)
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Column >
                    <Button
                        type="button"
                        className="btn btn-light btn-circle btn-xl"
                        id={this.props.item.id}
                        onClick={this.onClick.bind(this)}>
                        <Image className="logo-branch" src={this.props.item.Image}></Image>
                    </Button>
                    <Header textalign="center" size="small">{this.props.item.id}</Header>
                </Grid.Column>
            </React.Fragment>
        )
    }
}

export default IndexButtonStudent