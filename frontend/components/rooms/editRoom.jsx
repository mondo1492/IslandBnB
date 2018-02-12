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
    this.props.showRoom(this.props.match.params.id).then(()=>{
      this.setState({room: this.props.room});
    });
  }

  render() {
    return (
      <CreateRoom savedInfo={this.state.room} editing={true} />
    );
  }
}

export default withRouter(EditRoom);
