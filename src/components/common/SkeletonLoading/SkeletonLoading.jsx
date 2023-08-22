import React from 'react';
import './SkeletonLoading.css';
import { Container } from 'reactstrap';

const SkeletonLoading = ({ template }) => {
  const renderSkeletonTemplate = () => {
    switch (template) {
      case 'Timelog':
        return (
          <Container fluid="sm">
            <div className="skeleton-loading-timelog">
              <div className="skeleton-loading-item-timelog"></div>
              <div className="skeleton-loading-item-timelog"></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className="skeleton-loading-item-add-intangible"></div>
              </div>
            </div>
          </Container>
        );
      case 'TimelogFilter':
        return (
          <div className="skeleton-loading-timelog-filter">
            <div className="skeleton-loading-timelog-filter-item"></div>
            <div className="skeleton-loading-timelog-filter-item"></div>
            <div className="skeleton-loading-timelog-filter-item"></div>
          </div>
        );
      case 'TeamMemberTasks':
        const rows = [];
        for (let i = 0; i < 15; i++) {
          rows.push(
            <tr key={i}>
              <td colSpan={6} className="skeleton-loading-team-member-tasks-row"></td>
            </tr>,
          );
        }
        return rows;
      case 'WeeklySummary':
        return (
          <Container fluid="sm">
            <div className="skeleton-loading-weekly-summary"></div>
          </Container>
        );
      case 'WeeklySummariesReport':
        const reportItems = [];

        for (let i = 0; i < 10; i++) {
          reportItems.push(
            <div key={i}>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item mt-5"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <div className="skeleton-loading-weekly-summaries-report-item"></div>
              <hr />
            </div>,
          );
        }

        return (
          <Container fluid>
            <div style={{ marginTop: '2rem', marginLeft: '12rem', marginRight: '5rem' }}>
              <h3 style={{ textAlign: 'left', paddingBottom: '2rem' }}>
                Weekly Summaries Reports page
              </h3>
              <div className="skeleton-loading-weekly-summaries-report">{reportItems}</div>
            </div>
          </Container>
        );
      case 'UserProfile':
        return (
          <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ margin: '3rem 3rem 0 16rem' }}>
              <div
                className="skeleton-loading-user-profile-picture"
                style={{ marginBottom: '16rem' }}
              ></div>
              <div className="skeleton-loading-user-profile-picture"></div>
            </div>
            <div className="mx-5" style={{ marginTop: '6rem' }}>
              <div className="skeleton-loading-user-profile-item"></div>
              <div className="skeleton-loading-user-profile-item mt-5"></div>
              <div className="skeleton-loading-user-profile-item" style={{ height: '16rem' }}></div>
              <div
                className="skeleton-loading-user-profile-item"
                style={{ marginTop: '4rem' }}
              ></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
              <div className="skeleton-loading-user-profile-item mt-3"></div>
            </div>
          </Container>
        );
      case 'UserManagement':
        const userManagementItems = [];
        for (let i = 0; i < 17; i++) {
          userManagementItems.push(
            <div key={i} className="skeleton-loading-user-management-item"></div>,
          );
        }
        return <div>{userManagementItems}</div>;
      default:
        return null;
    }
  };
  return renderSkeletonTemplate();
};

export default SkeletonLoading;
