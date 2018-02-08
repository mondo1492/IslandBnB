import React from 'react';
import merge from 'lodash/merge';
import { Redirect, Route,Link, withRouter } from 'react-router-dom';
import CreateRoom from './room_container';
import RoomContainer from './editRoomContainer';

class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null
    };
  };

  componentDidMount() {
    console.log(this.props);
    this.props.showRoom(this.props.match.params.id).then(()=>{
      this.setState({room: this.props.room});
    });
  }
  componentWillUpdate() {
    console.log(this.props);
  }
  render() {
    console.log("RERENDER", this.props);
    return (
      <CreateRoom savedInfo={this.state.room} editing={true} />
    );
  }
}

export default withRouter(EditRoom);
