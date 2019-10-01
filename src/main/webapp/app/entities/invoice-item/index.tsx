import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvoiceItem from './invoice-item';
import InvoiceItemDetail from './invoice-item-detail';
import InvoiceItemUpdate from './invoice-item-update';
import InvoiceItemDeleteDialog from './invoice-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvoiceItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InvoiceItemDeleteDialog} />
  </>
);

export default Routes;
