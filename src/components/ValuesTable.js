import React from 'react';
import ValuesRow from '../components/ValuesRow';

const ValuesTable = React.createClass({

  render () {
    return (
      <div className="values-table">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <ValuesRow/>
            <ValuesRow/>
            <ValuesRow/>
          </tbody>
        </table>
      </div>
    );
  }
});

export default ValuesTable;