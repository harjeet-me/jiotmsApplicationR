import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BookingDetail extends React.Component<IBookingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bookingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.booking.detail.title">Booking</Translate> [<b>{bookingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="jiotmsApplicationRApp.booking.name">Name</Translate>
              </span>
            </dt>
            <dd>{bookingEntity.name}</dd>
            <dt>
              <span id="loadNuber">
                <Translate contentKey="jiotmsApplicationRApp.booking.loadNuber">Load Nuber</Translate>
              </span>
            </dt>
            <dd>{bookingEntity.loadNuber}</dd>
            <dt>
              <span id="shipmentNumber">
                <Translate contentKey="jiotmsApplicationRApp.booking.shipmentNumber">Shipment Number</Translate>
              </span>
            </dt>
            <dd>{bookingEntity.shipmentNumber}</dd>
            <dt>
              <span id="bol">
                <Translate contentKey="jiotmsApplicationRApp.booking.bol">Bol</Translate>
              </span>
            </dt>
            <dd>{bookingEntity.bol}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jiotmsApplicationRApp.booking.status">Status</Translate>
              </span>
            </dt>
            <dd>{bookingEntity.status}</dd>
            <dt>
              <Translate contentKey="jiotmsApplicationRApp.booking.customer">Customer</Translate>
            </dt>
            <dd>{bookingEntity.customer ? bookingEntity.customer.email : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/booking" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/booking/${bookingEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ booking }: IRootState) => ({
  bookingEntity: booking.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingDetail);
