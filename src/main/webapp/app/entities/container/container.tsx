import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IContainerState {
  search: string;
}

export class Container extends React.Component<IContainerProps, IContainerState> {
  state: IContainerState = {
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
    const { containerList, match } = this.props;
    return (
      <div>
        <h2 id="container-heading">
          <Translate contentKey="jiotmsApplicationRApp.container.home.title">Containers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jiotmsApplicationRApp.container.home.createLabel">Create a new Container</Translate>
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
                    placeholder={translate('jiotmsApplicationRApp.container.home.search')}
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
          {containerList && containerList.length > 0 ? (
            <Table responsive aria-describedby="container-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.company">Company</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.firstName">First Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.lastName">Last Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.phoneNumber">Phone Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jiotmsApplicationRApp.container.insuranceProvider">Insurance Provider</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {containerList.map((container, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${container.id}`} color="link" size="sm">
                        {container.id}
                      </Button>
                    </td>
                    <td>{container.company}</td>
                    <td>{container.firstName}</td>
                    <td>{container.lastName}</td>
                    <td>{container.email}</td>
                    <td>{container.phoneNumber}</td>
                    <td>{container.insuranceProvider}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${container.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${container.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${container.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jiotmsApplicationRApp.container.home.notFound">No Containers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ container }: IRootState) => ({
  containerList: container.entities
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
)(Container);
