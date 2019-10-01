import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DriverDetail extends React.Component<IDriverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { driverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.driver.detail.title">Driver</Translate> [<b>{driverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="company">
                <Translate contentKey="jiotmsApplicationRApp.driver.company">Company</Translate>
              </span>
            </dt>
            <dd>{driverEntity.company}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="jiotmsApplicationRApp.driver.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{driverEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="jiotmsApplicationRApp.driver.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{driverEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jiotmsApplicationRApp.driver.email">Email</Translate>
              </span>
            </dt>
            <dd>{driverEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="jiotmsApplicationRApp.driver.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{driverEntity.phoneNumber}</dd>
            <dt>
              <span id="licenceNumber">
                <Translate contentKey="jiotmsApplicationRApp.driver.licenceNumber">Licence Number</Translate>
              </span>
            </dt>
            <dd>{driverEntity.licenceNumber}</dd>
            <dt>
              <span id="dob">
                <Translate contentKey="jiotmsApplicationRApp.driver.dob">Dob</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/driver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/driver/${driverEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetail);
