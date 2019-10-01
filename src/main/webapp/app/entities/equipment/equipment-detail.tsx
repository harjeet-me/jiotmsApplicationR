import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentDetail extends React.Component<IEquipmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { equipmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.equipment.detail.title">Equipment</Translate> [<b>{equipmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="number">
                <Translate contentKey="jiotmsApplicationRApp.equipment.number">Number</Translate>
              </span>
            </dt>
            <dd>{equipmentEntity.number}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="jiotmsApplicationRApp.equipment.type">Type</Translate>
              </span>
            </dt>
            <dd>{equipmentEntity.type}</dd>
            <dt>
              <span id="size">
                <Translate contentKey="jiotmsApplicationRApp.equipment.size">Size</Translate>
              </span>
            </dt>
            <dd>{equipmentEntity.size}</dd>
            <dt>
              <span id="insurance">
                <Translate contentKey="jiotmsApplicationRApp.equipment.insurance">Insurance</Translate>
              </span>
            </dt>
            <dd>{equipmentEntity.insurance}</dd>
          </dl>
          <Button tag={Link} to="/entity/equipment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/equipment/${equipmentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentEntity: equipment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentDetail);
