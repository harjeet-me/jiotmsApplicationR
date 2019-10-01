import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IInvoiceItemState {
  search: string;
}

export class InvoiceItem extends React.Component<IInvoiceItemProps, IInvoiceItemState> {
  state: IInvoiceItemState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { invoiceItemList, match } = this.props;
    return (
      <div>
        <h2 id="invoice-item-heading">
          <Translate contentKey="jiotmsApplicationRApp.invoiceItem.home.title">Invoice Items</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jiotmsApplicationRApp.invoiceItem.home.createLabel">Create a new Invoice Item</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('jiotmsApplicationRApp.invoiceItem.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {invoiceItemList && invoiceItemList.length > 0 ? (
            <Table responsive aria-describedby="invoice-item-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.shipmentNumber">Shipment Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.invoiceItem.bol">Bol</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoiceItemList.map((invoiceItem, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="link" size="sm">
                        {invoiceItem.id}
                      </Button>
                    </td>
                    <td>{invoiceItem.name}</td>
                    <td>
                      <Translate contentKey={`jiotmsApplicationRApp.StatusEnum.${invoiceItem.status}`} />
                    </td>
                    <td>{invoiceItem.shipmentNumber}</td>
                    <td>{invoiceItem.bol}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoiceItem.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoiceItem.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="jiotmsApplicationRApp.invoiceItem.home.notFound">No Invoice Items found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemList: invoiceItem.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceItem);
