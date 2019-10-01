import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { getEntities as getInsurances } from 'app/entities/insurance/insurance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
  billingAddressId: string;
  contactId: string;
  insuranceId: string;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      billingAddressId: '0',
      contactId: '0',
      insuranceId: '0',
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

    this.props.getLocations();
    this.props.getContacts();
    this.props.getInsurances();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
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
    this.props.history.push('/entity/customer');
  };

  render() {
    const { customerEntity, locations, contacts, insurances, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.customer.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="customer-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyLabel" for="customer-company">
                    <Translate contentKey="jiotmsApplicationRApp.customer.company">Company</Translate>
                  </Label>
                  <AvField id="customer-company" type="text" name="company" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="customer-firstName">
                    <Translate contentKey="jiotmsApplicationRApp.customer.firstName">First Name</Translate>
                  </Label>
                  <AvField id="customer-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="customer-lastName">
                    <Translate contentKey="jiotmsApplicationRApp.customer.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="customer-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="customer-email">
                    <Translate contentKey="jiotmsApplicationRApp.customer.email">Email</Translate>
                  </Label>
                  <AvField id="customer-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="dotLabel" for="customer-dot">
                    <Translate contentKey="jiotmsApplicationRApp.customer.dot">Dot</Translate>
                  </Label>
                  <AvField id="customer-dot" type="string" className="form-control" name="dot" />
                </AvGroup>
                <AvGroup>
                  <Label id="mcLabel" for="customer-mc">
                    <Translate contentKey="jiotmsApplicationRApp.customer.mc">Mc</Translate>
                  </Label>
                  <AvField id="customer-mc" type="string" className="form-control" name="mc" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="customer-phoneNumber">
                    <Translate contentKey="jiotmsApplicationRApp.customer.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="customer-phoneNumber" type="string" className="form-control" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="customer-address">
                    <Translate contentKey="jiotmsApplicationRApp.customer.address">Address</Translate>
                  </Label>
                  <AvField id="customer-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetAddressLabel" for="customer-streetAddress">
                    <Translate contentKey="jiotmsApplicationRApp.customer.streetAddress">Street Address</Translate>
                  </Label>
                  <AvField id="customer-streetAddress" type="text" name="streetAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="customer-city">
                    <Translate contentKey="jiotmsApplicationRApp.customer.city">City</Translate>
                  </Label>
                  <AvField id="customer-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="customer-stateProvince">
                    <Translate contentKey="jiotmsApplicationRApp.customer.stateProvince">State Province</Translate>
                  </Label>
                  <AvField id="customer-stateProvince" type="text" name="stateProvince" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="customer-country">
                    <Translate contentKey="jiotmsApplicationRApp.customer.country">Country</Translate>
                  </Label>
                  <AvInput
                    id="customer-country"
                    type="select"
                    className="form-control"
                    name="country"
                    value={(!isNew && customerEntity.country) || 'USA'}
                  >
                    <option value="USA">{translate('jiotmsApplicationRApp.CountryEnum.USA')}</option>
                    <option value="CANADA">{translate('jiotmsApplicationRApp.CountryEnum.CANADA')}</option>
                    <option value="MEXICO">{translate('jiotmsApplicationRApp.CountryEnum.MEXICO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="customer-postalCode">
                    <Translate contentKey="jiotmsApplicationRApp.customer.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField id="customer-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label for="customer-billingAddress">
                    <Translate contentKey="jiotmsApplicationRApp.customer.billingAddress">Billing Address</Translate>
                  </Label>
                  <AvInput id="customer-billingAddress" type="select" className="form-control" name="billingAddress.id">
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.city}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customer-contact">
                    <Translate contentKey="jiotmsApplicationRApp.customer.contact">Contact</Translate>
                  </Label>
                  <AvInput id="customer-contact" type="select" className="form-control" name="contact.id">
                    <option value="" key="0" />
                    {contacts
                      ? contacts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.designation}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customer-insurance">
                    <Translate contentKey="jiotmsApplicationRApp.customer.insurance">Insurance</Translate>
                  </Label>
                  <AvInput id="customer-insurance" type="select" className="form-control" name="insurance.id">
                    <option value="" key="0" />
                    {insurances
                      ? insurances.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.providerNumber}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer" replace color="info">
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
  locations: storeState.location.entities,
  contacts: storeState.contact.entities,
  insurances: storeState.insurance.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess
});

const mapDispatchToProps = {
  getLocations,
  getContacts,
  getInsurances,
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
)(CustomerUpdate);
