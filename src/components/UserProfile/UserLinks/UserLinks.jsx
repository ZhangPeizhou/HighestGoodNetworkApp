/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Link } from 'react-router-dom';

function UserLinks({ links = [] }) {
  return (
    <div className="linkContainer">
      {links.map(item => {
        if (item.Link.includes('http')) {
          // Render external link if it's not an empty string
          if (item.Link.trim() !== '') {
            return (
              <React.Fragment key={item.Name}>
                <a key={item.link} href={item.Link} target="_blank" rel="noreferrer">
                  {item.Name.toUpperCase()}
                </a>
                <br />
              </React.Fragment>
            );
          }
        } else if (item.Link.trim() !== '') {
          // Check if the link is an internal link and not an empty string
          return (
            <React.Fragment key={item.Name}>
              <Link key={item.link} to={item.Link} target="_blank">
                {item.Name.toUpperCase()}
              </Link>
              <br />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}

export default UserLinks;
