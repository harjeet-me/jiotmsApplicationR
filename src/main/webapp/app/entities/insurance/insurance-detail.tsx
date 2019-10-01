import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InsuranceDetail extends React.Component<IInsuranceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { insuranceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.insurance.detail.title">Insurance</Translate> [<b>{insuranceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="providerNumber">
                <Translate contentKey="jiotmsApplicationRApp.insurance.providerNumber">Provider Number</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.providerNumber}</dd>
            <dt>
              <span id="provider">
                <Translate contentKey="jiotmsApplicationRApp.insurance.provider">Provider</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.provider}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="jiotmsApplicationRApp.insurance.description">Description</Translate>
              </span>
            </dt>
            <dd>{insuranceEntity.description}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="jiotmsApplicationRApp.insurance.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={insuranceEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="expiryDate">
                <Translate contentKey="jiotmsApplicationRApp.insurance.expiryDate">Expiry Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={insuranceEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/insurance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/insurance/${insuranceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceEntity: insurance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceDetail);
