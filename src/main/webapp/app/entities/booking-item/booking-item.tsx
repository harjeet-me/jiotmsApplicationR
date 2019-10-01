import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './booking-item.reducer';
import { IBookingItem } from 'app/shared/model/booking-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IBookingItemState {
  search: string;
}

export class BookingItem extends React.Component<IBookingItemProps, IBookingItemState> {
  state: IBookingItemState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { bookingItemList, match } = this.props;
    return (
      <div>
        <h2 id="booking-item-heading">
          <Translate contentKey="jiotmsApplicationRApp.bookingItem.home.title">Booking Items</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jiotmsApplicationRApp.bookingItem.home.createLabel">Create a new Booking Item</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('jiotmsApplicationRApp.bookingItem.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {bookingItemList && bookingItemList.length > 0 ? (
            <Table responsive aria-describedby="booking-item-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.pickup">Pickup</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.drop">Drop</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.source">Source</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.destination">Destination</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.currentLocation">Current Location</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.detention">Detention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.chasisInTime">Chasis In Time</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.pod">Pod</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.hazmat">Hazmat</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.recievedBy">Recieved By</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.equipment">Equipment</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.driver">Driver</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.bookingItem.mainBooking">Main Booking</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookingItemList.map((bookingItem, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${bookingItem.id}`} color="link" size="sm">
                        {bookingItem.id}
                      </Button>
                    </td>
                    <td>{bookingItem.description}</td>
                    <td>
                      <TextFormat type="date" value={bookingItem.pickup} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={bookingItem.drop} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{bookingItem.source}</td>
                    <td>{bookingItem.destination}</td>
                    <td>{bookingItem.currentLocation}</td>
                    <td>
                      <Translate contentKey={`jiotmsApplicationRApp.StatusEnum.${bookingItem.status}`} />
                    </td>
                    <td>{bookingItem.detention}</td>
                    <td>
                      <TextFormat type="date" value={bookingItem.chasisInTime} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {bookingItem.pod ? (
                        <div>
                          <a onClick={openFile(bookingItem.podContentType, bookingItem.pod)}>
                            <img src={`data:${bookingItem.podContentType};base64,${bookingItem.pod}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {bookingItem.podContentType}, {byteSize(bookingItem.pod)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{bookingItem.hazmat ? 'true' : 'false'}</td>
                    <td>{bookingItem.recievedBy}</td>
                    <td>
                      {bookingItem.equipment ? (
                        <Link to={`equipment/${bookingItem.equipment.id}`}>{bookingItem.equipment.number}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{bookingItem.driver ? <Link to={`driver/${bookingItem.driver.id}`}>{bookingItem.driver.firstName}</Link> : ''}</td>
                    <td>
                      {bookingItem.mainBooking ? (
                        <Link to={`booking/${bookingItem.mainBooking.id}`}>{bookingItem.mainBooking.name}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${bookingItem.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bookingItem.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${bookingItem.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="jiotmsApplicationRApp.bookingItem.home.notFound">No Booking Items found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bookingItem }: IRootState) => ({
  bookingItemList: bookingItem.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingItem);
