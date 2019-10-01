import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInvoiceItemUpdateState {
  isNew: boolean;
}

export class InvoiceItemUpdate extends React.Component<IInvoiceItemUpdateProps, IInvoiceItemUpdateState> {
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
      const { invoiceItemEntity } = this.props;
      const entity = {
        ...invoiceItemEntity,
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
    this.props.history.push('/entity/invoice-item');
  };

  render() {
    const { invoiceItemEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.invoiceItem.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.invoiceItem.home.createOrEditLabel">Create or edit a InvoiceItem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : invoiceItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="invoice-item-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="invoice-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="invoice-item-name">
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.name">Name</Translate>
                  </Label>
                  <AvField id="invoice-item-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="invoice-item-status">
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="invoice-item-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && invoiceItemEntity.status) || 'PICKEDUP'}
                  >
                    <option value="PICKEDUP">{translate('jiotmsApplicationRApp.StatusEnum.PICKEDUP')}</option>
                    <option value="ONROAD">{translate('jiotmsApplicationRApp.StatusEnum.ONROAD')}</option>
                    <option value="DELIVERED">{translate('jiotmsApplicationRApp.StatusEnum.DELIVERED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="shipmentNumberLabel" for="invoice-item-shipmentNumber">
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.shipmentNumber">Shipment Number</Translate>
                  </Label>
                  <AvField id="invoice-item-shipmentNumber" type="text" name="shipmentNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="bolLabel" for="invoice-item-bol">
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.bol">Bol</Translate>
                  </Label>
                  <AvField id="invoice-item-bol" type="text" name="bol" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/invoice-item" replace color="info">
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
  invoiceItemEntity: storeState.invoiceItem.entity,
  loading: storeState.invoiceItem.loading,
  updating: storeState.invoiceItem.updating,
  updateSuccess: storeState.invoiceItem.updateSuccess
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
)(InvoiceItemUpdate);
