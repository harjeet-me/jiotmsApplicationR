import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBookingUpdateState {
  isNew: boolean;
  customerId: string;
}

export class BookingUpdate extends React.Component<IBookingUpdateProps, IBookingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
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

    this.props.getCustomers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { bookingEntity } = this.props;
      const entity = {
        ...bookingEntity,
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
    this.props.history.push('/entity/booking');
  };

  render() {
    const { bookingEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.booking.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.booking.home.createOrEditLabel">Create or edit a Booking</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bookingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="booking-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="booking-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="booking-name">
                    <Translate contentKey="jiotmsApplicationRApp.booking.name">Name</Translate>
                  </Label>
                  <AvField id="booking-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="loadNuberLabel" for="booking-loadNuber">
                    <Translate contentKey="jiotmsApplicationRApp.booking.loadNuber">Load Nuber</Translate>
                  </Label>
                  <AvField id="booking-loadNuber" type="text" name="loadNuber" />
                </AvGroup>
                <AvGroup>
                  <Label id="shipmentNumberLabel" for="booking-shipmentNumber">
                    <Translate contentKey="jiotmsApplicationRApp.booking.shipmentNumber">Shipment Number</Translate>
                  </Label>
                  <AvField id="booking-shipmentNumber" type="text" name="shipmentNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="bolLabel" for="booking-bol">
                    <Translate contentKey="jiotmsApplicationRApp.booking.bol">Bol</Translate>
                  </Label>
                  <AvField id="booking-bol" type="text" name="bol" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="booking-status">
                    <Translate contentKey="jiotmsApplicationRApp.booking.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="booking-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && bookingEntity.status) || 'PICKEDUP'}
                  >
                    <option value="PICKEDUP">{translate('jiotmsApplicationRApp.StatusEnum.PICKEDUP')}</option>
                    <option value="ONROAD">{translate('jiotmsApplicationRApp.StatusEnum.ONROAD')}</option>
                    <option value="DELIVERED">{translate('jiotmsApplicationRApp.StatusEnum.DELIVERED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="booking-customer">
                    <Translate contentKey="jiotmsApplicationRApp.booking.customer">Customer</Translate>
                  </Label>
                  <AvInput id="booking-customer" type="select" className="form-control" name="customer.id">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/booking" replace color="info">
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
  customers: storeState.customer.entities,
  bookingEntity: storeState.booking.entity,
  loading: storeState.booking.loading,
  updating: storeState.booking.updating,
  updateSuccess: storeState.booking.updateSuccess
});

const mapDispatchToProps = {
  getCustomers,
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
)(BookingUpdate);
