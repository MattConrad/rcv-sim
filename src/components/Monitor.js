import React, { Component } from 'react';
import { 
  Typography, 
  Table, 
  TableBody,
  TableHead, 
  TableRow,
  TableCell
} from 'material-ui';

import { database } from '../services';

class Monitor extends Component {
  state = {

  }

  componentDidMount() {
    const { key } = this.props.match.params;
    database.ref(`elections/${key}`).on('value', (snapshot) => {
      this.setState({ election: snapshot.val() })
    });
    database.ref(`candidates/${key}`).on('value', (snapshot) => {
      const candidatesObj = snapshot.val();
      const candidatesArray = Object.keys(snapshot.val()).map(key => (
        { id: key, name: candidatesObj[key].name}
      ));
      this.setState({ candidates: candidatesArray });
    });
    database.ref(`votes/${key}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({ votes: Object.values(snapshot.val()) })
      }
    });
  }

  getVotesForPosition = (position, candidateId) => {
    const results = this.state.votes.reduce((total, vote) => (
      vote[position] === candidateId ? total + 1 : total
    ), 0);
    return results;
  };

  render() {
    const { candidates, votes, election } = this.state;

    return (
      <div>
        { election && candidates ?
          <div>
            <Typography>{this.state.election.title}</Typography>
            <Table>
              <TableHead
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableCell key={0} colSpan="2"/>
                  {this.state.candidates.map((candidate, i) => (
                    <TableCell key={i + 1}>{i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                displayRowCheckbox={false}
              >
                {this.state.candidates.map((candidate, i) => (
                  <TableRow key={i}>
                    <TableCell key={0} colSpan="2">{candidate.name}</TableCell>
                    { candidates.map((c, i) => (
                      <TableCell key={i + 1}>
                        <Typography>{votes ? this.getVotesForPosition(i + 1, candidate.id) : 0 }</Typography>
                      </TableCell>
                    ))}
                  </TableRow> 
                ))}
              </TableBody>
            </Table>
          </div>
        : 
          <Typography>Loading...</Typography>
        }
      </div>
    );
  }
}

export default Monitor;