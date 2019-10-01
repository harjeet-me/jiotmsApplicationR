import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './booking-item.reducer';
import { IBookingItem } from 'app/shared/model/booking-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BookingItemDetail extends React.Component<IBookingItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bookingItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.bookingItem.detail.title">BookingItem</Translate> [<b>{bookingItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="description">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.description">Description</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.description}</dd>
            <dt>
              <span id="pickup">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.pickup">Pickup</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bookingItemEntity.pickup} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="drop">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.drop">Drop</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bookingItemEntity.drop} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="source">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.source">Source</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.source}</dd>
            <dt>
              <span id="destination">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.destination">Destination</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.destination}</dd>
            <dt>
              <span id="currentLocation">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.currentLocation">Current Location</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.currentLocation}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.status">Status</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.status}</dd>
            <dt>
              <span id="detention">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.detention">Detention</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.detention}</dd>
            <dt>
              <span id="chasisInTime">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.chasisInTime">Chasis In Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bookingItemEntity.chasisInTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="pod">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.pod">Pod</Translate>
              </span>
            </dt>
            <dd>
              {bookingItemEntity.pod ? (
                <div>
                  <a onClick={openFile(bookingItemEntity.podContentType, bookingItemEntity.pod)}>
                    <img src={`data:${bookingItemEntity.podContentType};base64,${bookingItemEntity.pod}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {bookingItemEntity.podContentType}, {byteSize(bookingItemEntity.pod)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="hazmat">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.hazmat">Hazmat</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.hazmat ? 'true' : 'false'}</dd>
            <dt>
              <span id="recievedBy">
                <Translate contentKey="jiotmsApplicationRApp.bookingItem.recievedBy">Recieved By</Translate>
              </span>
            </dt>
            <dd>{bookingItemEntity.recievedBy}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.bookingItem.equipment">Equipment</Translate>
            </dt>
            <dd>{bookingItemEntity.equipment ? bookingItemEntity.equipment.number : ''}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.bookingItem.driver">Driver</Translate>
            </dt>
            <dd>{bookingItemEntity.driver ? bookingItemEntity.driver.firstName : ''}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.bookingItem.mainBooking">Main Booking</Translate>
            </dt>
            <dd>{bookingItemEntity.mainBooking ? bookingItemEntity.mainBooking.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/booking-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/booking-item/${bookingItemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ bookingItem }: IRootState) => ({
  bookingItemEntity: bookingItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingItemDetail);
