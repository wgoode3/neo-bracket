import React, { Component } from 'react';
import ViewGame from "./ViewGame";
import Footer from './Footer';


class ViewBracket extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
        <div className="view-bracket">
          {
            this.props.games.map( game => 
              <ViewGame game={game} />
            )
          }
        </div>
        <Footer />
      </div>
    )
  }

}

export default ViewBracket;