import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InvoiceItemDetail extends React.Component<IInvoiceItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { invoiceItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jiotmsApplicationRApp.invoiceItem.detail.title">InvoiceItem</Translate> [<b>{invoiceItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="jiotmsApplicationRApp.invoiceItem.name">Name</Translate>
              </span>
            </dt>
            <dd>{invoiceItemEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jiotmsApplicationRApp.invoiceItem.status">Status</Translate>
              </span>
            </dt>
            <dd>{invoiceItemEntity.status}</dd>
            <dt>
              <span id="shipmentNumber">
                <Translate contentKey="jiotmsApplicationRApp.invoiceItem.shipmentNumber">Shipment Number</Translate>
              </span>
            </dt>
            <dd>{invoiceItemEntity.shipmentNumber}</dd>
            <dt>
              <span id="bol">
                <Translate contentKey="jiotmsApplicationRApp.invoiceItem.bol">Bol</Translate>
              </span>
            </dt>
            <dd>{invoiceItemEntity.bol}</dd>
          </dl>
          <Button tag={Link} to="/entity/invoice-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/invoice-item/${invoiceItemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemEntity: invoiceItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceItemDetail);
