import {
  NextPageContext,
  NextComponentType,
} from 'next';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Page from '../containers/page';
import { onChangeProximity } from '../actions';
import { Store } from '../store';

interface IndexPageContext extends NextPageContext {
  store: Store;
}

const IndexPage: NextComponentType<IndexPageContext> = compose()(Page);

IndexPage.getInitialProps = ({ store, req }) => {
  const isServer: boolean = !!req;
  const { limeHome } = store.getState();

  const defaultProximity = '1500';
  store.dispatch(onChangeProximity(Object.assign(limeHome.proximity, {
    value: defaultProximity,
  })));

  return {
    isServer,
  };
}

export default connect()(IndexPage);
