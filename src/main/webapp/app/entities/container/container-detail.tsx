import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContainerDetail extends React.Component<IContainerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { containerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.container.detail.title">Container</Translate> [<b>{containerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="company">
                <Translate contentKey="jiotmsApplicationRApp.container.company">Company</Translate>
              </span>
            </dt>
            <dd>{containerEntity.company}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="jiotmsApplicationRApp.container.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{containerEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="jiotmsApplicationRApp.container.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{containerEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jiotmsApplicationRApp.container.email">Email</Translate>
              </span>
            </dt>
            <dd>{containerEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="jiotmsApplicationRApp.container.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{containerEntity.phoneNumber}</dd>
            <dt>
              <span id="insuranceProvider">
                <Translate contentKey="jiotmsApplicationRApp.container.insuranceProvider">Insurance Provider</Translate>
              </span>
            </dt>
            <dd>{containerEntity.insuranceProvider}</dd>
          </dl>
          <Button tag={Link} to="/entity/container" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/container/${containerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ container }: IRootState) => ({
  containerEntity: container.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerDetail);
