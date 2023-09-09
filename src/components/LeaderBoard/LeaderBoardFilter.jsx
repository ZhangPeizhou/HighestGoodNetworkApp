import React, { useEffect, useState, useRef } from 'react';
import './Leaderboard.css';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import { Table, Progress, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import {
  hasLeaderboardPermissions,
  assignStarDotColors,
  showStar,
} from 'utils/leaderboardPermissions';
import hasPermission from 'utils/permissions';
import MouseoverTextTotalTimeEditButton from 'components/mouseoverText/MouseoverTextTotalTimeEditButton';
import { toast } from 'react-toastify';




export default function LeaderBoardFilter({data}){

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const dashboardToggle = () => {
    setIsDashboardOpen
  }
  console.log("lb filter", data)


  return  <table className='leaderboard table-fixed table'>
  <tr>
  <th>Status</th>
  <th>Name</th>
  <th>
    <span className="d-sm-none">Tan. Time</span>
    <span className="d-none d-sm-block">Tangible Time</span>
  </th>
  <th>Progress</th>
  <th>Total</th>
  </tr>
  {
    data.map((item, index)=>{
      return <tr key={item.firstName + index}>
         <td className="align-middle">
                  <div>
                    <Modal isOpen={isDashboardOpen} toggle={dashboardToggle}>
                      <ModalHeader toggle={dashboardToggle}>Jump to personal Dashboard</ModalHeader>
                      <ModalBody>
                        <p>Are you sure you wish to view this {item.name} dashboard?</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="primary" onClick={() => showDashboard(item)}>
                          Ok
                        </Button>{' '}
                        <Button variant="secondary" onClick={dashboardToggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* <Link to={`/dashboard/${item._id}`}> */}
                    <div onClick={() => dashboardToggle(item)}>
                      { showStar(item.tangibletime, item.weeklycommittedHours) ? (
                        <i
                          className="fa fa-star"
                          title={`Weekly Committed: ${item.weeklycommittedHours} hours`}
                          style={{
                            color: assignStarDotColors(
                              item.tangibletime,
                              item.weeklycommittedHours,
                            ),
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        />
                      ) : (
                        <div
                          title={`Weekly Committed: ${item.weeklycommittedHours} hours`}
                          style={{
                            backgroundColor:
                              item.tangibletime >= item.weeklycommittedHours ? '#32CD32' : 'red',
                            width: 15,
                            height: 15,
                            borderRadius: 7.5,
                            margin: 'auto',
                            verticalAlign: 'middle',
                          }}
                        />
                      )}
                    </div>
                    { item.hasSummary && (
                      <div
                        title={`Weekly Summary Submitted`}
                        style={{
                          color: '#32a518',
                          cursor: 'default',
                        }}
                      >
                        <strong>✓</strong>
                      </div>
                    )}
                  </div>
                  {/* </Link> */}
                </td>
        <td>
        <Link to={`/userprofile/${item._id}`} title="View Profile">
                    {item.firstName} {item.role}
                  </Link>
          </td>
          <td className="align-middle" id={`id${item._id}`}>
                  <span title="Tangible time">{item.totalTangibleHrs}</span>
                </td>
                <td className="align-middle">
                  <Link
                    to={`/timelog/${item._id}`}
                    title={`TangibleEffort: ${item.totalTangibleHrs} hours`}
                  >
                    <Progress value={item.barprogress} color={item.barcolor} />
                  </Link>
                </td>

          
          </tr>
    })
  }
  </table>
}