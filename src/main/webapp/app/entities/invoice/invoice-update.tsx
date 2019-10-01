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
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInvoiceUpdateState {
  isNew: boolean;
  invoiceToId: string;
}

export class InvoiceUpdate extends React.Component<IInvoiceUpdateProps, IInvoiceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      invoiceToId: '0',
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
    values.invoiceDueDate = convertDateTimeToServer(values.invoiceDueDate);

    if (errors.length === 0) {
      const { invoiceEntity } = this.props;
      const entity = {
        ...invoiceEntity,
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
    this.props.history.push('/entity/invoice');
  };

  render() {
    const { invoiceEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jiotmsApplicationRApp.invoice.home.createOrEditLabel">
              <Translate contentKey="jiotmsApplicationRApp.invoice.home.createOrEditLabel">Create or edit a Invoice</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : invoiceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="invoice-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="bookingNoLabel" for="invoice-bookingNo">
                    <Translate contentKey="jiotmsApplicationRApp.invoice.bookingNo">Booking No</Translate>
                  </Label>
                  <AvField id="invoice-bookingNo" type="text" name="bookingNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="invoiceTotalLabel" for="invoice-invoiceTotal">
                    <Translate contentKey="jiotmsApplicationRApp.invoice.invoiceTotal">Invoice Total</Translate>
                  </Label>
                  <AvField id="invoice-invoiceTotal" type="string" className="form-control" name="invoiceTotal" />
                </AvGroup>
                <AvGroup>
                  <Label id="invoiceDueDateLabel" for="invoice-invoiceDueDate">
                    <Translate contentKey="jiotmsApplicationRApp.invoice.invoiceDueDate">Invoice Due Date</Translate>
                  </Label>
                  <AvInput
                    id="invoice-invoiceDueDate"
                    type="datetime-local"
                    className="form-control"
                    name="invoiceDueDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.invoiceEntity.invoiceDueDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="invoice-status">
                    <Translate contentKey="jiotmsApplicationRApp.invoice.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="invoice-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && invoiceEntity.status) || 'PICKEDUP'}
                  >
                    <option value="PICKEDUP">{translate('jiotmsApplicationRApp.StatusEnum.PICKEDUP')}</option>
                    <option value="ONROAD">{translate('jiotmsApplicationRApp.StatusEnum.ONROAD')}</option>
                    <option value="DELIVERED">{translate('jiotmsApplicationRApp.StatusEnum.DELIVERED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="invoice-invoiceTo">
                    <Translate contentKey="jiotmsApplicationRApp.invoice.invoiceTo">Invoice To</Translate>
                  </Label>
                  <AvInput id="invoice-invoiceTo" type="select" className="form-control" name="invoiceTo.id">
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/invoice" replace color="info">
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
  invoiceEntity: storeState.invoice.entity,
  loading: storeState.invoice.loading,
  updating: storeState.invoice.updating,
  updateSuccess: storeState.invoice.updateSuccess
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
)(InvoiceUpdate);
