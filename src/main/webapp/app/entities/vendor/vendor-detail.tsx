import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vendor.reducer';
import { IVendor } from 'app/shared/model/vendor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VendorDetail extends React.Component<IVendorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.vendor.detail.title">Vendor</Translate> [<b>{vendorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="company">
                <Translate contentKey="jiotmsApplicationRApp.vendor.company">Company</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.company}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="jiotmsApplicationRApp.vendor.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="jiotmsApplicationRApp.vendor.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.lastName}</dd>
            <dt>
              <span id="dot">
                <Translate contentKey="jiotmsApplicationRApp.vendor.dot">Dot</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.dot}</dd>
            <dt>
              <span id="mc">
                <Translate contentKey="jiotmsApplicationRApp.vendor.mc">Mc</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.mc}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jiotmsApplicationRApp.vendor.email">Email</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="jiotmsApplicationRApp.vendor.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.phoneNumber}</dd>
            <dt>
              <span id="insuranceProvider">
                <Translate contentKey="jiotmsApplicationRApp.vendor.insuranceProvider">Insurance Provider</Translate>
              </span>
            </dt>
            <dd>{vendorEntity.insuranceProvider}</dd>
          </dl>
          <Button tag={Link} to="/entity/vendor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/vendor/${vendorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vendor }: IRootState) => ({
  vendorEntity: vendor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorDetail);
