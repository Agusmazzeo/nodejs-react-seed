import React from 'react';

const Room =(props)=>{
  return(
    <React.Fragment>
      <h2>{props.roomName}</h2>
      <ul>
       <li>{props.users[0]}</li>
       <li>{props.users[1]}</li>
      </ul>
      </React.Fragment>
  )
}

export default Room;