import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContactDetail extends React.Component<IContactDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contactEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.contact.detail.title">Contact</Translate> [<b>{contactEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="designation">
                <Translate contentKey="jiotmsApplicationRApp.contact.designation">Designation</Translate>
              </span>
            </dt>
            <dd>{contactEntity.designation}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="jiotmsApplicationRApp.contact.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{contactEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="jiotmsApplicationRApp.contact.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{contactEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="jiotmsApplicationRApp.contact.email">Email</Translate>
              </span>
            </dt>
            <dd>{contactEntity.email}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="jiotmsApplicationRApp.contact.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{contactEntity.phoneNumber}</dd>
          </dl>
          <Button tag={Link} to="/entity/contact" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contact/${contactEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ contact }: IRootState) => ({
  contactEntity: contact.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetail);
