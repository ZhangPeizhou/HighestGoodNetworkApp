/*********************************************************************************
 * Component: PROJECTS
 * Author: Henry Ng - 01/27/20
 * This component is used to build the layout of the list of projects
 * Childrens: Overview, ProjectTableHeader, Project ( List )
 * Layout: <Overview>
 *         <ProjectTableHeader>
 *         {  <Project>...  }
 *
 ********************************************************************************/
import React, { Component } from 'react';
import {
  fetchAllProjects,
  postNewProject,
  deleteProject,
  modifyProject,
} from '../../actions/projects';
import {getProjectsByUsersName} from '../../actions/userProfile';
import { getPopupById } from '../../actions/popupEditorAction';
import Overview from './Overview';
import AddProject from './AddProject';
import SearchProjectByPerson from './SearchProject/SearchProjectByPerson'; 
import ProjectTableHeader from './ProjectTableHeader';
import Project from './Project';
import ModalDelete from './../common/Modal';
import ModalMsg from './../common/Modal';
import ProjectInfoModal from './ProjectInfoModal';
import * as Message from './../../languages/en/messages';
import { NOTICE } from './../../languages/en/ui';
import './projects.css';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { PROJECT_DELETE_POPUP_ID } from './../../constants/popupId';
import hasPermission from '../../utils/permissions';
import EditableInfoModal from '../UserProfile/EditableModal/EditableInfoModal';
import { toast } from 'react-toastify';


export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalDelete: false,
      showModalMsg: false,
      trackModelMsg: false,
       // The property below is the state that tracks the selected category to sort the project list - Sucheta #PR1738
       categorySelectedForSort : "",
       searchByName: false, // this flag determines execution of function that renders projects by Name - Sucheta 
       firstName: "",
       lastName: "",
       nameInput: "",
       showStatus: "",
       sortBy: "",
      projectTarget: {
        projectName: '',
        projectId: -1,
        active: false,
        category: '',
      },
      projectInfoModal: false,
    };
  }

  componentDidMount() {
    this.props.getPopupById(PROJECT_DELETE_POPUP_ID); // popup id
    this.props.fetchAllProjects(); // Fetch to get all projects
  }

  /**
   * Changes the number of active projects
   */
  onClickActive = (projectId, projectName, category, isActive) => {
    this.props.modifyProject('setActive', projectId, projectName, category, isActive);
  };

  onUpdateProjectName = (projectId, projectName, category, isActive) => {
    this.props.modifyProject('updateName', projectId, projectName, category, isActive);
  };

  /**
   * Changes the number of projects
   * Also update the number of active project
   */
  onClickDelete = (projectId, active, projectName, category) => {
    this.setState({
      showModalDelete: true,
      projectTarget: {
        projectId,
        projectName,
        active,
        category,
      },
    });
  };

  

  onChangeInputField = (e) => {
    if(e.target.name === 'nameInput'){
      this.setState({nameInput: e.target.value.trim()});
    }
    else if (e.target.name === 'nameSelector'){
      this.setState({nameInput: e.target.value.trim() });
    }
  }
  
  
  cancelSearchByName = (e) =>{
    this.setState({searchByName: false});
  }

  handleNameSubmit = async (e, nameInput) => {
    e.preventDefault();
    if(nameInput  ){
      let name =  nameInput.split(' ');
      const firstName = name[0];
      const lastName = name[1]
      this.setState({searchByName: true, nameInput: ''});
    
      this.props.getProjectsByUsersName(firstName,lastName);
    }
    else{
      toast.error("Please enter a name")
    }
    
  }

 // sort project list by category - Sucheta
 onChangeCategory = (value) =>{
  this.setState({
    categorySelectedForSort: value
  })
}
// sort project list by status- active / inactive - Sucheta
onSelectStatus = (value)=>{
  this.setState({
    showStatus: value
  })
}
// handle sort function alphabetically - Sucheta
handleSort = (e)=>{
  if(e.target.id === "Ascending"){
   this.setState({
    sortBy: "Ascending"
   })

  }else if(e.target.id === "Descending"){
    this.setState({
      sortBy: "Descending"
    })
  }else{
    this.setState({
      sortBy: ""
    })
  }
}



  confirmDelete = () => {
    // get project info
    let { projectId } = this.state.projectTarget;
    // request delete on db
    this.props.deleteProject(projectId);
    // disable modal
    this.setState({ showModalDelete: false });
  };

  setInactiveProject = () => {
    let { projectId, projectName, category } = this.state.projectTarget;
    this.props.modifyProject('setActive', projectId, projectName, category, true);
    // disable modal
    this.setState({ showModalDelete: false });
  };

  postProject = (name, category) => {
    this.props.postNewProject(name, category, true);
    this.setState({ trackModelMsg: true });
  };

  toggleProjectInfoModal = () => {
    this.setState({
      projectInfoModal: !this.state.projectInfoModal,
    });
  };


  render() {
    const {darkMode} = this.props.state.theme;
    
    let { showModalDelete, projectTarget, trackModelMsg, projectInfoModal } = this.state;
    let { projects, status, fetching, fetched } = this.props.state.allProjects;

    let numberOfProjects = projects.length;
    let numberOfActive = projects.filter(project => project.isActive).length;

    let showModalMsg = false;

    // by Sucheta
    const {categorySelectedForSort} = this.state;
    const {showStatus} = this.state;
    const {sortBy} = this.state; 
    const {firstName, lastName, nameInput} = this.state;
    const {userProjects, allUsers} = this.props; //This state variable to store list of projects to display by user Name
    const {searchByName} = this.state;

    const role = this.props.state.userProfile.role;

    const canPostProject = this.props.hasPermission('postProject');

    

    if (status === 400 && trackModelMsg) {
      showModalMsg = true;
    }

    // Display project lists
    let ProjectsList = [];
    if (projects.length > 0) {
      let sortedList = ""; // If user chooses to get sorted project list, this variable stores sorted project list - Sucheta
      if(sortBy === "Ascending"){
        sortedList = projects.sort((a,b)=>{
          if(a.projectName[0].toLowerCase() < b.projectName[0].toLowerCase()){
            return -1
          }else if(a.projectName[0].toLowerCase() > b.projectName[0].toLowerCase()){
            return 1
          }else{return 0}
        })
      }else if(sortBy === "Descending"){
        sortedList = projects.sort((a,b)=>{
          if(a.projectName[0].toLowerCase() < b.projectName[0].toLowerCase()){
            return 1
          }else if(a.projectName[0].toLowerCase() > b.projectName[0].toLowerCase()){
            return -1
          }else{return 0}
        })

      }
      // Below mentioned if block checks if there is a selected category to sort the projects - Sucheta

      if(categorySelectedForSort){
         if(categorySelectedForSort&&showStatus=== "Active"){
          ProjectsList =  (sortBy?sortedList: projects).map((project, index) => {
            if(project.category === categorySelectedForSort && project.isActive){
             return (<Project
              key={project._id}
              index={index}
              projectId={project._id}
              name={project.projectName}
              category={project.category || 'Unspecified'}
              active={project.isActive}
              onClickActive={this.onClickActive}
              onUpdateProjectName={this.onUpdateProjectName}
              onClickDelete={this.onClickDelete}
              confirmDelete={this.confirmDelete}
              darkMode={darkMode}
            />)
            }
          })
         }else if(categorySelectedForSort&&showStatus=== "Inactive"){
          ProjectsList = (sortBy?sortedList: projects).map((project, index) => {
            if(project.category === categorySelectedForSort && !project.isActive){
             return (<Project
              key={project._id}
              index={index}
              projectId={project._id}
              name={project.projectName}
              category={project.category || 'Unspecified'}
              active={project.isActive}
              onClickActive={this.onClickActive}
              onUpdateProjectName={this.onUpdateProjectName}
              onClickDelete={this.onClickDelete}
              confirmDelete={this.confirmDelete}
              darkMode={darkMode}
            />)
            }
          })
         }
         else{
          ProjectsList = (sortBy?sortedList: projects).map((project, index) => {
            if(project.category === categorySelectedForSort){
             return (<Project
              key={project._id}
              index={index}
              projectId={project._id}
              name={project.projectName}
              category={project.category || 'Unspecified'}
              active={project.isActive}
              onClickActive={this.onClickActive}
              onUpdateProjectName={this.onUpdateProjectName}
              onClickDelete={this.onClickDelete}
              confirmDelete={this.confirmDelete}
              darkMode={darkMode}
            />)
            }
          })
         }

      }else if(showStatus === "Active"){
        ProjectsList = (sortBy?sortedList: projects).map((project, index) => {
          if(project.isActive){
           return (<Project
            key={project._id}
            index={index}
            projectId={project._id}
            name={project.projectName}
            category={project.category || 'Unspecified'}
            active={project.isActive}
            onClickActive={this.onClickActive}
            onUpdateProjectName={this.onUpdateProjectName}
            onClickDelete={this.onClickDelete}
            confirmDelete={this.confirmDelete}
            darkMode={darkMode}
          />)
          }
        })

      }else if(showStatus === "Inactive"){
        ProjectsList = (sortBy?sortedList: projects).map((project, index) => {
          if(!project.isActive){
           return (<Project
            key={project._id}
            index={index}
            projectId={project._id}
            name={project.projectName}
            category={project.category || 'Unspecified'}
            active={project.isActive}
            onClickActive={this.onClickActive}
            onUpdateProjectName={this.onUpdateProjectName}
            onClickDelete={this.onClickDelete}
            confirmDelete={this.confirmDelete}
            darkMode={darkMode}
          />)
          }
        })

      }else if(searchByName && userProjects){

        let filteredList = projects.filter(project => userProjects.includes(project._id));
       
        ProjectsList = filteredList.map((project, index)=>{
          return (<Project
            key={project._id}
            index={index}
            projectId={project._id}
            name={project.projectName}
            category={project.category || 'Unspecified'}
            active={project.isActive}
            onClickActive={this.onClickActive}
            onUpdateProjectName={this.onUpdateProjectName}
            onClickDelete={this.onClickDelete}
            confirmDelete={this.confirmDelete}
            darkMode={darkMode}
          />)
        })
      }
      else{
        ProjectsList = (sortBy?sortedList: projects).map((project, index) => (
          <Project
            key={project._id}
            index={index}
            projectId={project._id}
            name={project.projectName}
            category={project.category || 'Unspecified'}
            active={project.isActive}
            onClickActive={this.onClickActive}
            onUpdateProjectName={this.onUpdateProjectName}
            onClickDelete={this.onClickDelete}
            confirmDelete={this.confirmDelete}
            darkMode={darkMode}
          />
        ))
        }
    }

    return (
      <React.Fragment>
        <div className={darkMode ? 'bg-oxford-blue text-light' : ''}>
          <div className="container py-3">
            {fetching || !fetched ? <Loading /> : null}
            <div className="d-flex align-items-center">
            <h3 style={{ display: 'inline-block', marginRight: 10 }}>Projects</h3>
            <EditableInfoModal
              areaName="projectsInfoModal"
              areaTitle="Projects"
              fontSize={30}
              isPermissionPage={true}
              role={role}
            />
          </div>
          
          <Overview numberOfProjects={numberOfProjects} numberOfActive={numberOfActive} />
          

            
          {canPostProject ? <AddProject addNewProject={this.postProject} /> : null}
            
          <SearchProjectByPerson onChangeInputField={this.onChangeInputField} firstName={firstName} lastName={lastName} nameInput={nameInput} handleNameSubmit={this.handleNameSubmit} cancelSearchByName={this.cancelSearchByName} allUsers={this.props.allUsers} onSelectHandler={this.onSelectHandler}/>

           
            

            <table className="table table-bordered table-responsive-sm">
              <thead>
              <ProjectTableHeader 
                onChange={this.onChangeCategory} 
                selectedValue= {categorySelectedForSort} 
                showStatus={showStatus} 
                selectStatus={this.onSelectStatus} 
                handleSort = {this.handleSort}
                darkMode={darkMode}
              />
              </thead>
         
              <tbody>{ProjectsList}</tbody>
            </table>
          </div>

          <ModalDelete
            isOpen={showModalDelete}
            closeModal={() => {
              this.setState({ showModalDelete: false });
            }}
            confirmModal={() => this.confirmDelete()}
            setInactiveModal={() => this.setInactiveProject()}
            modalMessage={
              (this.props.state.popupEditor.currPopup.popupContent
                ? this.props.state.popupEditor.currPopup.popupContent.replace(
                    '[project_name]',
                    this.state.projectTarget.projectName,
                  )
                : '') || ''
            }
            modalTitle={Message.CONFIRM_DELETION}
          />

          <ModalMsg
            isOpen={showModalMsg}
            closeModal={() => {
              this.setState({ showModalMsg: false, trackModelMsg: false });
            }}
            modalMessage={Message.THIS_PROJECT_NAME_IS_ALREADY_TAKEN}
            modalTitle={NOTICE}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // console.log("This is the state", state.allUserProfiles.userProfiles);
  return { state, userProjects: state.userProjectsByUserNameReducer.projects?.projects, userError: state.userProjectsByUserNameReducer.userError, allUsers: state.allUserProfiles.userProfiles  };
};

export default connect(mapStateToProps, {
  fetchAllProjects,
  postNewProject,
  deleteProject,
  modifyProject,
  getPopupById,
  hasPermission,
  getProjectsByUsersName

})(Projects);
