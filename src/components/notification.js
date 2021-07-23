import React from 'react'

const Notification = ({msg, timeout}) => {
    console.log('msg',msg);
    const style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      margiBottom: 10
    }
    if( msg === null ) {
      return null
    }
    setTimeout(timeout,5000)
    return(
      <div style={style}>
        {msg}
      </div>
    )
  }

export default Notification