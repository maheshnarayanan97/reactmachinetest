import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Container, Jumbotron } from "reactstrap";
import { useSelector } from "react-redux";

import "./Dashboard.css";

const Dashboard = ({ isAuthenticated }) => {
  const authData = useSelector((state) => state.auth);

  return (
    <div className="Dashboard">
      <Container>
        <Jumbotron className="Dashboard-Main text-light text-left">
          {isAuthenticated === true ? (
            <Fragment>
              <h1 className="dashboard-heading display-3">
                Welcome to Dashboard
              </h1>
              <br />
              <h1 className="dashboard-text display-4">
                {authData.data.userData.username}
              </h1>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="dashboard-heading display-3">
                Welcome to Dashboard
              </h1>
            </Fragment>
          )}
        </Jumbotron>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
