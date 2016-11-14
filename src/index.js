// Importing dependencies

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import Input from './Input.jsx';
import { Navbar, Icon, Row, Col, CardPanel, Input, Button} from 'react-materialize';


// constructor for stateful Component

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      espnURL: 'http://www.espn.com/nba/game?gameId=400899515',
      showResults: false
    };
  }

  changeHeader(e) {
    this.setState({espnURL: e.target.value});
  }
  changeReddit(e) {
    e.preventDefault()
    this.setState({espnURL: e.target.value});
    axios.post(`http://localhost:5000/data`, {
      spider: 'espn_crawler',
      url: `${this.state.espnURL}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        const posts = res.data;
        this.setState({showResults: true});
        console.log(posts);
        this.setState({ posts });
      });
  }


  // creating a promise for AJAX request and then sets the state of the posts components

  // componentDidMount() {
  //   axios.post(`http://localhost:5000/data`, querystring.stringify({
  //     spider: 'espn_crawler',
  //     url: `${this.state.espnURL}`
  //   }), {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     const posts = res;
  //     this.setState({ posts });
  //   });
  // }

  // render components to the page

  render() {
    return (
      <div>
          <Col s={12} m={12}>
            <Row>
              <Navbar brand='StatGrabber' className="teal lighten-4" right>
              </Navbar>
            </Row>
            <Row>
              <Col s={12} m={12}>
                <Row>
                  <h3>Grabbing Stats From:  </h3>
                  <h5>{this.state.espnURL}</h5>
                </Row>
                <Row s={12} m={10} offset='m2'>
                  <Input s={6} value={this.state.espnURL} onChange={this.changeHeader.bind(this)} label="Please Enter an ESPN URL" />
                  <Button type="button" onClick={this.changeReddit.bind(this)} waves='light'><Icon left>send</Icon> Get Stats!</Button>
                </Row>
                  <Row>
                    <Col s={12} m={5}>
                      <CardPanel className="teal lighten-4 black-text">

                      </CardPanel>
                        <ul className="PlayerList">
                          {
                            this.state.posts.map(function(statObj) {
                              statObj.map(function(stat){                           return <li key={stat}>{stat}
                                </li>
                              })
                            })
                          }
                        </ul>
                    </Col>
                  </Row>
              </Col>
            </Row>
          </Col>

      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs"/>,
  document.getElementById('root')
);
