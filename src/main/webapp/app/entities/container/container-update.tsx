import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContainerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContainerUpdateState {
  isNew: boolean;
}

export class ContainerUpdate extends React.Component<IContainerUpdateProps, IContainerUpdateState> {
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
      const { containerEntity } = this.props;
      const entity = {
        ...containerEntity,
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
    this.props.history.push('/entity/container');
  };

  render() {
    const { containerEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.container.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.container.home.createOrEditLabel">Create or edit a Container</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : containerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="container-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="container-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="companyLabel" for="container-company">
                    <Translate contentKey="jiotmsApplicationRApp.container.company">Company</Translate>
                  </Label>
                  <AvField id="container-company" type="text" name="company" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="container-firstName">
                    <Translate contentKey="jiotmsApplicationRApp.container.firstName">First Name</Translate>
                  </Label>
                  <AvField id="container-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="container-lastName">
                    <Translate contentKey="jiotmsApplicationRApp.container.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="container-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="container-email">
                    <Translate contentKey="jiotmsApplicationRApp.container.email">Email</Translate>
                  </Label>
                  <AvField id="container-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="container-phoneNumber">
                    <Translate contentKey="jiotmsApplicationRApp.container.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="container-phoneNumber" type="string" className="form-control" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="insuranceProviderLabel" for="container-insuranceProvider">
                    <Translate contentKey="jiotmsApplicationRApp.container.insuranceProvider">Insurance Provider</Translate>
                  </Label>
                  <AvField id="container-insuranceProvider" type="text" name="insuranceProvider" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/container" replace color="info">
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
  containerEntity: storeState.container.entity,
  loading: storeState.container.loading,
  updating: storeState.container.updating,
  updateSuccess: storeState.container.updateSuccess
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
)(ContainerUpdate);
