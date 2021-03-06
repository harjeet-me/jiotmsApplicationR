import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEquipmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEquipmentUpdateState {
  isNew: boolean;
}

export class EquipmentUpdate extends React.Component<IEquipmentUpdateProps, IEquipmentUpdateState> {
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
      const { equipmentEntity } = this.props;
      const entity = {
        ...equipmentEntity,
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
    this.props.history.push('/entity/equipment');
  };

  render() {
    const { equipmentEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.equipment.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.equipment.home.createOrEditLabel">Create or edit a Equipment</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : equipmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="equipment-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="equipment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberLabel" for="equipment-number">
                    <Translate contentKey="jiotmsApplicationRApp.equipment.number">Number</Translate>
                  </Label>
                  <AvField id="equipment-number" type="text" name="number" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="equipment-type">
                    <Translate contentKey="jiotmsApplicationRApp.equipment.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="equipment-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && equipmentEntity.type) || 'TRAILER'}
                  >
                    <option value="TRAILER">{translate('jiotmsApplicationRApp.EquipmentEnum.TRAILER')}</option>
                    <option value="CONTAINER">{translate('jiotmsApplicationRApp.EquipmentEnum.CONTAINER')}</option>
                    <option value="CHASIS">{translate('jiotmsApplicationRApp.EquipmentEnum.CHASIS')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="sizeLabel" for="equipment-size">
                    <Translate contentKey="jiotmsApplicationRApp.equipment.size">Size</Translate>
                  </Label>
                  <AvInput
                    id="equipment-size"
                    type="select"
                    className="form-control"
                    name="size"
                    value={(!isNew && equipmentEntity.size) || 'FIFTYTHREE'}
                  >
                    <option value="FIFTYTHREE">{translate('jiotmsApplicationRApp.SizeEnum.FIFTYTHREE')}</option>
                    <option value="FORTYTHREE">{translate('jiotmsApplicationRApp.SizeEnum.FORTYTHREE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="insuranceLabel" for="equipment-insurance">
                    <Translate contentKey="jiotmsApplicationRApp.equipment.insurance">Insurance</Translate>
                  </Label>
                  <AvField id="equipment-insurance" type="text" name="insurance" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/equipment" replace color="info">
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
  equipmentEntity: storeState.equipment.entity,
  loading: storeState.equipment.loading,
  updating: storeState.equipment.updating,
  updateSuccess: storeState.equipment.updateSuccess
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
)(EquipmentUpdate);
