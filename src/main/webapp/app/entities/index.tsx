import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Booking from './booking';
import Invoice from './invoice';
import InvoiceItem from './invoice-item';
import Insurance from './insurance';
import Contact from './contact';
import BookingItem from './booking-item';
import Equipment from './equipment';
import Customer from './customer';
import Vendor from './vendor';
import Container from './container';
import Driver from './driver';
import Location from './location';
import Region from './region';
import Country from './country';
import Department from './department';
import Task from './task';
import Employee from './employee';
import Job from './job';
import JobHistory from './job-history';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/booking`} component={Booking} />
      <ErrorBoundaryRoute path={`${match.url}/invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}/invoice-item`} component={InvoiceItem} />
      <ErrorBoundaryRoute path={`${match.url}/insurance`} component={Insurance} />
      <ErrorBoundaryRoute path={`${match.url}/contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}/booking-item`} component={BookingItem} />
      <ErrorBoundaryRoute path={`${match.url}/equipment`} component={Equipment} />
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}/vendor`} component={Vendor} />
      <ErrorBoundaryRoute path={`${match.url}/container`} component={Container} />
      <ErrorBoundaryRoute path={`${match.url}/driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/region`} component={Region} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/job`} component={Job} />
      <ErrorBoundaryRoute path={`${match.url}/job-history`} component={JobHistory} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
