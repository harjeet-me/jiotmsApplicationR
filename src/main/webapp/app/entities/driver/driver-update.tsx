import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDriverUpdateState {
  isNew: boolean;
}

export class DriverUpdate extends React.Component<IDriverUpdateProps, IDriverUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { driverEntity } = this.props;
      const entity = {
        ...driverEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/driver');
  };

  render() {
    const { driverEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.driver.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.driver.home.createOrEditLabel">Create or edit a Driver</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : driverEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="driver-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="driver-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyLabel" for="driver-company">
                    <Translate contentKey="jiotmsApplicationRApp.driver.company">Company</Translate>
                  </Label>
                  <AvField id="driver-company" type="text" name="company" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="driver-firstName">
                    <Translate contentKey="jiotmsApplicationRApp.driver.firstName">First Name</Translate>
                  </Label>
                  <AvField id="driver-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="driver-lastName">
                    <Translate contentKey="jiotmsApplicationRApp.driver.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="driver-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="driver-email">
                    <Translate contentKey="jiotmsApplicationRApp.driver.email">Email</Translate>
                  </Label>
                  <AvField id="driver-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="driver-phoneNumber">
                    <Translate contentKey="jiotmsApplicationRApp.driver.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="driver-phoneNumber" type="string" className="form-control" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="licenceNumberLabel" for="driver-licenceNumber">
                    <Translate contentKey="jiotmsApplicationRApp.driver.licenceNumber">Licence Number</Translate>
                  </Label>
                  <AvField id="driver-licenceNumber" type="string" className="form-control" name="licenceNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="dobLabel" for="driver-dob">
                    <Translate contentKey="jiotmsApplicationRApp.driver.dob">Dob</Translate>
                  </Label>
                  <AvField id="driver-dob" type="date" className="form-control" name="dob" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/driver" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  driverEntity: storeState.driver.entity,
  loading: storeState.driver.loading,
  updating: storeState.driver.updating,
  updateSuccess: storeState.driver.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverUpdate);
