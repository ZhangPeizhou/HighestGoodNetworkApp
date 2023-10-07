// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export function MonthlyEffort(props) {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState(0);
  // eslint-disable-next-line no-unused-vars

  const fetchID = async () => {
    const { auth } = props;
    const userID = auth.user.userid;
    setState(userID);
  };

  useEffect(() => {
    fetchID();
  }, []);

  return (
    <div className="card-body text-white">
      <h5 className="card-title">Monthly Efforts</h5>
      <div />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MonthlyEffort);
