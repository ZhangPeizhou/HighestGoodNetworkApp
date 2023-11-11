import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { fetchProjectDetailById } from 'actions/bmdashboard/projectDetailActions';
import LogBar from './LogBar';
import RentedToolsDisplay from './RentedTools/RentedToolsDisplay';
import MaterialsDisplay from './Materials/MaterialsDisplay';
// import ProjectLog from './ProjectLog';
import ProjectLog from './ProjectLog';
import './ProjectDetails.css';

export function ProjectDetails(props) {
  const { projectId } = useParams();
  // destructure projectDetail, errors, dispatch from props
  const { buildingProject, errors, dispatch } = props;
  console.log('project details: ', buildingProject);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectDetailById(projectId));
  }, []);

  useEffect(() => {
    if (Object.entries(errors).length) {
      setIsError(true);
    }
  }, [errors]);

  return (
    <Container className="project-details" fluid>
      <Row className="mx-auto">
        <h1>{buildingProject.name} Dashboard</h1>
      </Row>
      <Row className="mx-auto">
        <LogBar />
      </Row>
      <Row className="mx-auto">
        <Col lg="6" md="12">
          <RentedToolsDisplay />
        </Col>
        <Col lg="6" md="12">
          <MaterialsDisplay />
        </Col>
      </Row>
      <Row className="mx-auto">
        <ProjectLog />
      </Row>
    </Container>
  );
}
const mapStateToProps = state => ({
  buildingProject: state.buildingProject,
  // if an error is returned by axios during the fetch, it will be added to the errors object
  errors: state.errors,
});

export default connect(mapStateToProps)(ProjectDetails);
