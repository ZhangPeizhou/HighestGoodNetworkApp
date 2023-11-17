import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './LessonForm.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getAllRoles } from '../../../actions/role';
import { fetchAllProjects } from '../../../actions/projects';
import Noimg from './images/Noimg3.jpg';

const style = {
  backgroundImage: `url(${Noimg})`,
};
function LessonForm() {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.role.roles);
  const projects = useSelector(state => state.allProjects.projects);
  const [LessonFormtags, setLessonFormTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagInput = e => {
    e.preventDefault();
    setTagInput(e.target.value);
  };

  const addTag = e => {
    e.preventDefault();
    if (tagInput) {
      setLessonFormTags([...LessonFormtags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = tagIndex => {
    const newTags = LessonFormtags.filter((_, index) => index !== tagIndex);
    setLessonFormTags(newTags);
  };
  useEffect(() => {
    // Dispatch the action to fetch roles when the component mounts
    dispatch(getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the action to fetch projects when the component mounts
    dispatch(fetchAllProjects());
  }, [dispatch]);
  const fileInputRef = useRef(null);
  const { projectId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project
  const handleFileSelection = e => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file); // Update the state with the selected file
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleKeyPress = e => {
    e.preventDefault();
    // console.log("hi Keypress")
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    // Reset the file input value to clear the selection
    if (fileInput) {
      fileInput.value = '';
    }
  };
  // TODO Adjust this function so when users enter tags then enter a belonging project it doesnt reset all tags
  const handleProjectChange = e => {
    const selectedProjectId = e.target.value;
    setSelectedProject(selectedProjectId);
  };

  useEffect(() => {
    // Set the LessonFormtags to include the selected project without resetting existing tags
    if (selectedProject) {
      setLessonFormTags(tags => {
        // Check if the selected project is already in tags
        const hasSelectedProject = tags.includes(selectedProject);

        // If not, add it to the tags array
        if (!hasSelectedProject) {
          return [...tags, selectedProject];
        }

        return tags; // If already present, no change needed
      });
    }
  }, [selectedProject]);

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [video, setVideo] = useState(null);

  const handlePreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.style.width = '100%';
      newVideo.style.height = '100%';
      newVideo.style.zIndex = '999';
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('autoplay', '');
      // Get the container element to append the video
      const videoContainer = document.getElementById('videoContainer');
      // Append the video to the container
      videoContainer.appendChild(newVideo);
      // Set the video element in the state before playing it
      setVideo(newVideo);
      // Wait for the loadedmetadata event to ensure video dimensions are available
      await new Promise(resolve => {
        newVideo.addEventListener('loadedmetadata', resolve);
      });
      // Display the live camera feed
      setIsPreviewing(true);
    } catch (error) {
      // console.error('Error accessing the camera:', error);
    }
  };
  const handleCapture = async () => {
    try {
      if (!video) {
        // console.error('Video element not found.');
        return;
      }
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Stop the stream
      video.srcObject.getTracks().forEach(track => track.stop());
      // Remove the video element from the 'videoContainer'
      const videoContainer = document.getElementById('videoContainer');
      videoContainer.removeChild(video);
      // Convert the canvas content to a blob and create a File object
      canvas.toBlob(blob => {
        const file = new File([blob], 'capturedPhoto.png', { type: 'image/png' });
        setSelectedFile(file);
        setIsPreviewing(false); // Hide the live preview
      }, 'image/png');
    } catch (error) {
      // console.error('Error capturing the photo:', error);
    }
  };

  let content;
  if (isPreviewing) {
    content = <div id="videoContainer" />;
  } else if (selectedFile) {
    content = <p>Selected File: {selectedFile.name}</p>;
  } else {
    content = (
      <div className="TextAndImageDiv">
        <div className="ImageDiv" style={style} />
        <p className="DragandDropText">Drag and drop your file here</p>
      </div>
    );
  }
  return (
    <div className="MasterContainer">
      <div className="FormContainer">
        <Form>
          <div className="WriteLessonAndTagDiv">
            <Form.Group className="LessonForm" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="LessonLabel">Write a Lesson</Form.Label>
              <Form.Control
                className="LessonPlaceholderText"
                as="textarea"
                placeholder="Enter the lesson you learn..."
                rows={10}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Add tag</Form.Label>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Input tag for the lesson"
                  value={tagInput}
                  onChange={handleTagInput}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addTag(e);
                    }
                  }}
                  className="form-control"
                />
                <div className="input-group-append">
                  <Button size="sm" type="button" onClick={addTag} className="btn">
                    Add
                  </Button>
                </div>
              </div>
              <div className="TagsDiv">
                {LessonFormtags.map((tag, index) => {
                  const key = `${tag}_${index}`;
                  return (
                    <div className="Tag" key={key}>
                      <span className="TagSpan">{tag}</span>
                      <button
                        className="removeTagBTN"
                        type="button"
                        onClick={() => removeTag(index)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </Form.Group>
          </div>
          <div className="FormSelectContainer">
            <div className="SingleFormSelect">
              <Form.Group controlId="Form.ControlSelect1">
                <Form.Label>Belongs to</Form.Label>
                <FormControl
                  onChange={handleProjectChange}
                  as="select"
                  aria-label="Default select example"
                >
                  {projectId && <option>Project id= {projectId}</option>}
                  {projects.map(project => (
                    <option key={project._id} value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </div>
            <div className="SingleFormSelect">
              <Form.Group controlId="Form.ControlSelect2">
                {/* By default the lesson can be read by anyone. The author can change the permission to only public to certain roles. */}
                <Form.Label>View by</Form.Label>
                <FormControl as="select" aria-label="Default select example">
                  <option>All</option>
                  {roles.map(role => (
                    <option key={role._id} value={role.roleName}>
                      {role.roleName}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </div>
          </div>
          <div className="DragAndDropFormGroup">
            <Form.Group controlId="exampleForm.ControlFile1">
              <Form.Label>Upload Appendix</Form.Label>
              <div className="ButtonDiv">
                {isPreviewing ? (
                  <Button className="LessonFormButtonCapture" onClick={handleCapture} type="button">
                    Capture Photo
                  </Button>
                ) : (
                  <Button className="LessonFormButtonCapture" onClick={handlePreview} type="button">
                    Start Preview
                  </Button>
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelection}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`dragAndDropStyle ${selectedFile ? 'fileSelected' : ''}`}
              >
                <div id="videoContainer" />
                {content}
              </div>
            </Form.Group>
          </div>
          <div className="ButtonDiv">
            <Button className="LessonFormButtonCancel" type="cancel">
              Cancel
            </Button>
            <Button className="LessonFormButtonSubmit" type="submit">
              Post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default LessonForm;
