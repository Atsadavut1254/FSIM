import React , { Component } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';

class SetButton extends Component{
  Redirect_f(){
    this.props.Redirect(this.props.item);
  }

  render() {
    return (
      <React.Fragment>
        <Grid columns={2} relaxed='very' style={{ marginTop: '5%' }} divided>
          <Grid.Column width={6} verticalAlign='middle' textAlign='right'>
            <Button size='huge' className="Tab2-text btn-EditData" id={this.props.item.name} style={{fontSize:'18px',width:'200px'}}
              onClick={this.Redirect_f.bind(this)}>
                <Icon name="add user"></Icon>{this.props.item.name}
            </Button>
          </Grid.Column>

          <Grid.Column verticalAlign='middle' width={10} textAlign='left'>
            {this.props.item.detail}
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default SetButton;