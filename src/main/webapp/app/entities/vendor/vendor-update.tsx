import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vendor.reducer';
import { IVendor } from 'app/shared/model/vendor.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVendorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVendorUpdateState {
  isNew: boolean;
}

export class VendorUpdate extends React.Component<IVendorUpdateProps, IVendorUpdateState> {
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
      const { vendorEntity } = this.props;
      const entity = {
        ...vendorEntity,
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
    this.props.history.push('/entity/vendor');
  };

  render() {
    const { vendorEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.vendor.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.vendor.home.createOrEditLabel">Create or edit a Vendor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vendorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="vendor-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="vendor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyLabel" for="vendor-company">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.company">Company</Translate>
                  </Label>
                  <AvField id="vendor-company" type="text" name="company" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="vendor-firstName">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.firstName">First Name</Translate>
                  </Label>
                  <AvField id="vendor-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="vendor-lastName">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="vendor-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="dotLabel" for="vendor-dot">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.dot">Dot</Translate>
                  </Label>
                  <AvField id="vendor-dot" type="string" className="form-control" name="dot" />
                </AvGroup>
                <AvGroup>
                  <Label id="mcLabel" for="vendor-mc">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.mc">Mc</Translate>
                  </Label>
                  <AvField id="vendor-mc" type="string" className="form-control" name="mc" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="vendor-email">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.email">Email</Translate>
                  </Label>
                  <AvField id="vendor-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="vendor-phoneNumber">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="vendor-phoneNumber" type="string" className="form-control" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="insuranceProviderLabel" for="vendor-insuranceProvider">
                    <Translate contentKey="jiotmsApplicationRApp.vendor.insuranceProvider">Insurance Provider</Translate>
                  </Label>
                  <AvField id="vendor-insuranceProvider" type="text" name="insuranceProvider" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/vendor" replace color="info">
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
  vendorEntity: storeState.vendor.entity,
  loading: storeState.vendor.loading,
  updating: storeState.vendor.updating,
  updateSuccess: storeState.vendor.updateSuccess
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
)(VendorUpdate);
