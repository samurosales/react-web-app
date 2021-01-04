import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/docs/src/pages/getting-started/templates/dashboard/Dashboard';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Dashboard from './Dashboard';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
