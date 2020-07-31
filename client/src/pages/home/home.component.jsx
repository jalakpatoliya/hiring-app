import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../header/header.comopnent';

function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default withRouter(HomePage);
