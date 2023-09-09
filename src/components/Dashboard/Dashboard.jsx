import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import Leaderboard from '../LeaderBoard';
import LeaderBoardFilter from 'components/LeaderBoard/LeaderBoardFilter';
import WeeklySummary from '../WeeklySummary/WeeklySummary';
import Badge from '../Badge';
import Timelog from '../Timelog/Timelog';
import SummaryBar from '../SummaryBar/SummaryBar';
import PopUpBar from '../PopUpBar';
import '../../App.css';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/userProfile';
import {

  getTeamMembers

} from '../../actions/allTeamsAction';
import { getTimeZoneAPIKey } from '../../actions/timezoneAPIActions';
import axios from "axios";
import { ENDPOINTS } from '../../utils/URL';

export const Dashboard = props => {
  const [popup, setPopup] = useState(false);
  const [summaryBarData, setSummaryBarData] = useState(null);
  const [userProfile, setUserProfile] = useState(undefined);
  const  [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers ] = useState([]);
  let userId = props.match.params.userId ? props.match.params.userId : props.auth.user.userid;

  //console.log("all team", props.team)
  const toggle = () => {
    setPopup(!popup);
    setTimeout(() => {
      let elem = document.getElementById('weeklySum');
      if (elem) {
        elem.scrollIntoView();
      }
    }, 150);
  };

  const getTeamData = async () =>{
    const response = await axios.get(ENDPOINTS.USER_PROFILE(userId));
    const newUserProfile = response.data;
    setTeams(newUserProfile.teams)
    console.log("team data in here?", newUserProfile.teams);
  }

  const selectHandler = async (e) => {
    console.log("dropdown",e.target.value);

    const data = await props.getTeamMembers(e.target.value);
    console.log("team members?", props.teamsTeamMembers.teamMembers)
    setTeamMembers( props.teamsTeamMembers.teamMembers)
  }

  useEffect(() => {
    props.getTimeZoneAPIKey();

    getTeamData();
  



  }, []);
  console.log("teams?", teams)
  useEffect(() => {
    if (props.match.params && props.match.params.userId && userId != props.match.params.userId) {
      userId = props.match.params.userId;
      getUserProfile(userId);
    }
  }, [props.match]);

  return (
    <Container fluid>
      {props.match.params.userId && props.auth.user.userid !== props.match.params.userId ? (
        <PopUpBar />
      ) : (
        ''
      )}
      <SummaryBar
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        asUser={userId}
        toggleSubmitForm={toggle}
        role={props.auth.user.role}
        summaryBarData={summaryBarData}
      />

      <Row>
        <Col lg={{ size: 7 }}>&nbsp;</Col>
        <Col lg={{ size: 5 }}>
          <div className="row justify-content-center">
            <div
              role="button"
              className="mt-3 mb-5 text-center"
              onClick={toggle}
              onKeyDown={toggle}
              tabIndex="0"
            >
              <WeeklySummary isDashboard={true} isPopup={popup} asUser={userId} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{ size: 5 }} className="order-sm-12">

        <select onChange={selectHandler}>
        {
          props.auth.user.role === "Administrator" && teams != undefined && teams.map((team) => {
            return <option value={team._id}>{team.teamName}</option>
        })}
        </select>
          {
            teamMembers.length !== 0? <LeaderBoardFilter data={teamMembers} /> : <Leaderboard asUser={userId} selected={"Team 1"}/>
          }
          
        </Col>
        <Col lg={{ size: 7 }} className="left-col-dashboard order-sm-1">
          {popup ? (
            <div className="my-2">
              <div id="weeklySum">
                <WeeklySummary asUser={userId} setPopup={setPopup} />
              </div>
            </div>
          ) : null}
          <div className="my-2">
            <a name="wsummary"></a>
            <Timelog isDashboard={true} asUser={userId} passSummaryBarData={setSummaryBarData} />
          </div>
          <Badge userId={userId} role={props.auth.user.role} />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  team: state.team,
  teamsTeamMembers: state.teamsTeamMembers

});

export default connect(mapStateToProps, {
  getTimeZoneAPIKey,
  getTeamMembers

})(Dashboard);
