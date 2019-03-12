import React, { Component } from 'react';
import ViewGame from "./ViewGame";


class ViewBracket extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="view-bracket">
        {
          this.props.games.map( game => 
            <ViewGame game={game} />
          )
        }
      </div>
    )
  }

}

export default ViewBracket;