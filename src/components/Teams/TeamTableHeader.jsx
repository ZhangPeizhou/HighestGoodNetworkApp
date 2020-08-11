import React from 'react'
import { ID, TEAM_NAME, ACTIVE, MEMBERS } from '../../languages/en/ui';



/**
 * The header row of the user table. 
 */
const TeamTableHeader = React.memo((props) => {

  return (
    <tr>
      <th scope="col" id="teams__order">#</th>
      <th scope="col">{TEAM_NAME}</th>
      <th scope="col" id="teams__active">{ACTIVE}</th>
      <th scope="col" id="teams__members">{MEMBERS}</th>
      <th scope="col" id="teams__delete"></th>

    </tr>
  )
});

export default TeamTableHeader;