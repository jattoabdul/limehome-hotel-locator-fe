import React from 'react';
import { compose } from 'recompose';
import LimeHome from './limehome';

const Page = (props) => {
  return <LimeHome {...props} />;
};

export default compose()(Page);
