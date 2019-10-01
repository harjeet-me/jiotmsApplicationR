import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICustomerState {
  search: string;
}

export class Customer extends React.Component<ICustomerProps, ICustomerState> {
  state: ICustomerState = {
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
    const { customerList, match } = this.props;
    return (
      <div>
        <h2 id="customer-heading">
          <Translate contentKey="jiotmsApplicationRApp.customer.home.title">Customers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jiotmsApplicationRApp.customer.home.createLabel">Create a new Customer</Translate>
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
                    placeholder={translate('jiotmsApplicationRApp.customer.home.search')}
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
          {customerList && customerList.length > 0 ? (
            <Table responsive aria-describedby="customer-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.company">Company</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.firstName">First Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.lastName">Last Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.dot">Dot</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.mc">Mc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.phoneNumber">Phone Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.address">Address</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.streetAddress">Street Address</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.city">City</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.stateProvince">State Province</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.country">Country</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.postalCode">Postal Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.billingAddress">Billing Address</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.contact">Contact</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.customer.insurance">Insurance</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                        {customer.id}
                      </Button>
                    </td>
                    <td>{customer.company}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.dot}</td>
                    <td>{customer.mc}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>{customer.streetAddress}</td>
                    <td>{customer.city}</td>
                    <td>{customer.stateProvince}</td>
                    <td>
                      <Translate contentKey={`jiotmsApplicationRApp.CountryEnum.${customer.country}`} />
                    </td>
                    <td>{customer.postalCode}</td>
                    <td>
                      {customer.billingAddress ? (
                        <Link to={`location/${customer.billingAddress.id}`}>{customer.billingAddress.city}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{customer.contact ? <Link to={`contact/${customer.contact.id}`}>{customer.contact.designation}</Link> : ''}</td>
                    <td>
                      {customer.insurance ? <Link to={`insurance/${customer.insurance.id}`}>{customer.insurance.providerNumber}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jiotmsApplicationRApp.customer.home.notFound">No Customers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities
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
)(Customer);
