import React, { useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { permissionLabel } from './UserRoleTab';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { addNewRole, getAllRoles } from '../../actions/role';
import { commonBackEndPermissions, permissionFrontToBack } from 'utils/associatedPermissions';

const CreateNewRolePopup = ({ toggle, addNewRole }) => {
  const [permissionsChecked, setPermissionsChecked] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [isValidRole, setIsValidRole] = useState(true);
  const noSymbolsRegex = /^([a-zA-Z0-9 ]+)$/;

  const handleSubmit = async e => {
    e.preventDefault();
    let permissionsBackEnd = permissionsChecked.map(permission => {
      permissionFrontToBack(permission);
    });

    permissionsBackEnd = [...permissionsBackEnd, ...commonBackEndPermissions].flat();

    if (newRoleName === '') {
      setIsValidRole(false);
      toast.error('Please enter a role name');
    } else {
      const newRoleObject = {
        roleName: newRoleName,
        permissions: permissionsChecked,
        permissionsBackEnd,
      };
      await addNewRole(newRoleObject);
      toast.success('Role created successfully');
      toggle();
    }
  };

  const handleRoleName = e => {
    const { value } = e.target;
    if (value.length == 0) {
      setNewRoleName(value);
      setIsValidRole(false);
    } else {
      noSymbolsRegex.test(value) ? setNewRoleName(value) : setNewRoleName(prevRole => prevRole);
      setIsValidRole(true);
    }
  };

  const handleChange = e => {
    const actualValue = e.target.value;

    setPermissionsChecked(previous => {
      const isAlreadyChecked = previous.some(perm => perm === actualValue);
      const unCheckPermission = previous.filter(perm => perm !== actualValue);
      return isAlreadyChecked ? unCheckPermission : [...previous, actualValue];
    });
  };

  return (
    <Form id="createRole" onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Role Name:</Label>
        <Input
          placeholder="Please enter a new role name"
          value={newRoleName}
          onChange={handleRoleName}
        />
        {isValidRole === false ? (
          <Alert className="createRole__alert" color="danger">
            Please enter a role name.
          </Alert>
        ) : (
          <></>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Permissions:</Label>
        {Object.entries(permissionLabel).map(([key, value]) => {
          return (
            <FormCheck
              onChange={e => handleChange(e)}
              value={key}
              key={key}
              label={value}
              id={value}
            />
          );
        })}
      </FormGroup>
      <Button type="submit" id="createRole" color="primary" size="lg" block>
        Create
      </Button>
    </Form>
  );
};

const mapStateToProps = state => ({ roles: state.role.roles });

const mapDispatchToProps = dispatch => ({
  getAllRoles: () => dispatch(getAllRoles()),
  addNewRole: newRole => dispatch(addNewRole(newRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewRolePopup);
