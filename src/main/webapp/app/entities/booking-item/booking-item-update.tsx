import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipment } from 'app/shared/model/equipment.model';
import { getEntities as getEquipment } from 'app/entities/equipment/equipment.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { getEntities as getBookings } from 'app/entities/booking/booking.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './booking-item.reducer';
import { IBookingItem } from 'app/shared/model/booking-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBookingItemUpdateState {
  isNew: boolean;
  equipmentId: string;
  driverId: string;
  mainBookingId: string;
}

export class BookingItemUpdate extends React.Component<IBookingItemUpdateProps, IBookingItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      equipmentId: '0',
      driverId: '0',
      mainBookingId: '0',
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

    this.props.getEquipment();
    this.props.getDrivers();
    this.props.getBookings();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.pickup = convertDateTimeToServer(values.pickup);
    values.drop = convertDateTimeToServer(values.drop);
    values.chasisInTime = convertDateTimeToServer(values.chasisInTime);

    if (errors.length === 0) {
      const { bookingItemEntity } = this.props;
      const entity = {
        ...bookingItemEntity,
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
    this.props.history.push('/entity/booking-item');
  };

  render() {
    const { bookingItemEntity, equipment, drivers, bookings, loading, updating } = this.props;
    const { isNew } = this.state;

    const { pod, podContentType } = bookingItemEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.bookingItem.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.bookingItem.home.createOrEditLabel">Create or edit a BookingItem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bookingItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="booking-item-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="booking-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descriptionLabel" for="booking-item-description">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.description">Description</Translate>
                  </Label>
                  <AvField id="booking-item-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="pickupLabel" for="booking-item-pickup">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.pickup">Pickup</Translate>
                  </Label>
                  <AvInput
                    id="booking-item-pickup"
                    type="datetime-local"
                    className="form-control"
                    name="pickup"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bookingItemEntity.pickup)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dropLabel" for="booking-item-drop">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.drop">Drop</Translate>
                  </Label>
                  <AvInput
                    id="booking-item-drop"
                    type="datetime-local"
                    className="form-control"
                    name="drop"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bookingItemEntity.drop)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="sourceLabel" for="booking-item-source">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.source">Source</Translate>
                  </Label>
                  <AvField id="booking-item-source" type="text" name="source" />
                </AvGroup>
                <AvGroup>
                  <Label id="destinationLabel" for="booking-item-destination">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.destination">Destination</Translate>
                  </Label>
                  <AvField id="booking-item-destination" type="text" name="destination" />
                </AvGroup>
                <AvGroup>
                  <Label id="currentLocationLabel" for="booking-item-currentLocation">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.currentLocation">Current Location</Translate>
                  </Label>
                  <AvField id="booking-item-currentLocation" type="text" name="currentLocation" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="booking-item-status">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="booking-item-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && bookingItemEntity.status) || 'PICKEDUP'}
                  >
                    <option value="PICKEDUP">{translate('jiotmsApplicationRApp.StatusEnum.PICKEDUP')}</option>
                    <option value="ONROAD">{translate('jiotmsApplicationRApp.StatusEnum.ONROAD')}</option>
                    <option value="DELIVERED">{translate('jiotmsApplicationRApp.StatusEnum.DELIVERED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="detentionLabel" for="booking-item-detention">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.detention">Detention</Translate>
                  </Label>
                  <AvField id="booking-item-detention" type="string" className="form-control" name="detention" />
                </AvGroup>
                <AvGroup>
                  <Label id="chasisInTimeLabel" for="booking-item-chasisInTime">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.chasisInTime">Chasis In Time</Translate>
                  </Label>
                  <AvInput
                    id="booking-item-chasisInTime"
                    type="datetime-local"
                    className="form-control"
                    name="chasisInTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.bookingItemEntity.chasisInTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="podLabel" for="pod">
                      <Translate contentKey="jiotmsApplicationRApp.bookingItem.pod">Pod</Translate>
                    </Label>
                    <br />
                    {pod ? (
                      <div>
                        <a onClick={openFile(podContentType, pod)}>
                          <img src={`data:${podContentType};base64,${pod}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {podContentType}, {byteSize(pod)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('pod')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_pod" type="file" onChange={this.onBlobChange(true, 'pod')} accept="image/*" />
                    <AvInput type="hidden" name="pod" value={pod} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="hazmatLabel" check>
                    <AvInput id="booking-item-hazmat" type="checkbox" className="form-control" name="hazmat" />
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.hazmat">Hazmat</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="recievedByLabel" for="booking-item-recievedBy">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.recievedBy">Recieved By</Translate>
                  </Label>
                  <AvField id="booking-item-recievedBy" type="text" name="recievedBy" />
                </AvGroup>
                <AvGroup>
                  <Label for="booking-item-equipment">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.equipment">Equipment</Translate>
                  </Label>
                  <AvInput id="booking-item-equipment" type="select" className="form-control" name="equipment.id">
                    <option value="" key="0" />
                    {equipment
                      ? equipment.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.number}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="booking-item-driver">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.driver">Driver</Translate>
                  </Label>
                  <AvInput id="booking-item-driver" type="select" className="form-control" name="driver.id">
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.firstName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="booking-item-mainBooking">
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.mainBooking">Main Booking</Translate>
                  </Label>
                  <AvInput id="booking-item-mainBooking" type="select" className="form-control" name="mainBooking.id">
                    <option value="" key="0" />
                    {bookings
                      ? bookings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/booking-item" replace color="info">
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
  equipment: storeState.equipment.entities,
  drivers: storeState.driver.entities,
  bookings: storeState.booking.entities,
  bookingItemEntity: storeState.bookingItem.entity,
  loading: storeState.bookingItem.loading,
  updating: storeState.bookingItem.updating,
  updateSuccess: storeState.bookingItem.updateSuccess
});

const mapDispatchToProps = {
  getEquipment,
  getDrivers,
  getBookings,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingItemUpdate);
