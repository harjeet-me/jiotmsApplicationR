import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BookingItem from './booking-item';
import BookingItemDetail from './booking-item-detail';
import BookingItemUpdate from './booking-item-update';
import BookingItemDeleteDialog from './booking-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BookingItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BookingItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BookingItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={BookingItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BookingItemDeleteDialog} />
  </>
);

export default Routes;
