import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="company">
                <Translate contentKey="jiotmsApplicationRApp.customer.company">Company</Translate>
              </span>
            </dt>
            <dd>{customerEntity.company}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="jiotmsApplicationRApp.customer.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{customerEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="jiotmsApplicationRApp.customer.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{customerEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jiotmsApplicationRApp.customer.email">Email</Translate>
              </span>
            </dt>
            <dd>{customerEntity.email}</dd>
            <dt>
              <span id="dot">
                <Translate contentKey="jiotmsApplicationRApp.customer.dot">Dot</Translate>
              </span>
            </dt>
            <dd>{customerEntity.dot}</dd>
            <dt>
              <span id="mc">
                <Translate contentKey="jiotmsApplicationRApp.customer.mc">Mc</Translate>
              </span>
            </dt>
            <dd>{customerEntity.mc}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="jiotmsApplicationRApp.customer.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{customerEntity.phoneNumber}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="jiotmsApplicationRApp.customer.address">Address</Translate>
              </span>
            </dt>
            <dd>{customerEntity.address}</dd>
            <dt>
              <span id="streetAddress">
                <Translate contentKey="jiotmsApplicationRApp.customer.streetAddress">Street Address</Translate>
              </span>
            </dt>
            <dd>{customerEntity.streetAddress}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="jiotmsApplicationRApp.customer.city">City</Translate>
              </span>
            </dt>
            <dd>{customerEntity.city}</dd>
            <dt>
              <span id="stateProvince">
                <Translate contentKey="jiotmsApplicationRApp.customer.stateProvince">State Province</Translate>
              </span>
            </dt>
            <dd>{customerEntity.stateProvince}</dd>
            <dt>
              <span id="country">
                <Translate contentKey="jiotmsApplicationRApp.customer.country">Country</Translate>
              </span>
            </dt>
            <dd>{customerEntity.country}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="jiotmsApplicationRApp.customer.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{customerEntity.postalCode}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.customer.billingAddress">Billing Address</Translate>
            </dt>
            <dd>{customerEntity.billingAddress ? customerEntity.billingAddress.city : ''}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.customer.contact">Contact</Translate>
            </dt>
            <dd>{customerEntity.contact ? customerEntity.contact.designation : ''}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.customer.insurance">Insurance</Translate>
            </dt>
            <dd>{customerEntity.insurance ? customerEntity.insurance.providerNumber : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/customer/${customerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
