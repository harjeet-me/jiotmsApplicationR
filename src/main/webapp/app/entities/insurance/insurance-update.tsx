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
import { getEntity, updateEntity, createEntity, reset } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInsuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInsuranceUpdateState {
  isNew: boolean;
  customerId: string;
}

export class InsuranceUpdate extends React.Component<IInsuranceUpdateProps, IInsuranceUpdateState> {
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
      const { insuranceEntity } = this.props;
      const entity = {
        ...insuranceEntity,
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
    this.props.history.push('/entity/insurance');
  };

  render() {
    const { insuranceEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.insurance.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.insurance.home.createOrEditLabel">Create or edit a Insurance</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : insuranceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="insurance-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="insurance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="providerNumberLabel" for="insurance-providerNumber">
                    <Translate contentKey="jiotmsApplicationRApp.insurance.providerNumber">Provider Number</Translate>
                  </Label>
                  <AvField id="insurance-providerNumber" type="text" name="providerNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="providerLabel" for="insurance-provider">
                    <Translate contentKey="jiotmsApplicationRApp.insurance.provider">Provider</Translate>
                  </Label>
                  <AvField id="insurance-provider" type="text" name="provider" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="insurance-description">
                    <Translate contentKey="jiotmsApplicationRApp.insurance.description">Description</Translate>
                  </Label>
                  <AvField id="insurance-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="insurance-startDate">
                    <Translate contentKey="jiotmsApplicationRApp.insurance.startDate">Start Date</Translate>
                  </Label>
                  <AvField id="insurance-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="expiryDateLabel" for="insurance-expiryDate">
                    <Translate contentKey="jiotmsApplicationRApp.insurance.expiryDate">Expiry Date</Translate>
                  </Label>
                  <AvField id="insurance-expiryDate" type="date" className="form-control" name="expiryDate" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/insurance" replace color="info">
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
  insuranceEntity: storeState.insurance.entity,
  loading: storeState.insurance.loading,
  updating: storeState.insurance.updating,
  updateSuccess: storeState.insurance.updateSuccess
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
)(InsuranceUpdate);
