import {
  NextPageContext,
  NextComponentType,
} from 'next';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Page from '../containers/page';
import { onChangeProximity, onChangeLocation, setMapCenter } from '../actions';
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

  const defaultLocation = '6.522500,3.321350';
  store.dispatch(onChangeLocation(Object.assign(limeHome.location, {
    value: defaultLocation,
  })));
  
  const defaultMapcenter = { lat: 6.522500, lng: 3.321350, };
  store.dispatch(setMapCenter(Object.assign(limeHome.mapCenter, {
    value: defaultMapcenter,
  })));

  return {
    isServer,
  };
}

export default connect()(IndexPage);
