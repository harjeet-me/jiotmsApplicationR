import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/booking">
      <Translate contentKey="global.menu.entities.booking" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/invoice">
      <Translate contentKey="global.menu.entities.invoice" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/invoice-item">
      <Translate contentKey="global.menu.entities.invoiceItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/insurance">
      <Translate contentKey="global.menu.entities.insurance" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/contact">
      <Translate contentKey="global.menu.entities.contact" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/booking-item">
      <Translate contentKey="global.menu.entities.bookingItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/equipment">
      <Translate contentKey="global.menu.entities.equipment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/vendor">
      <Translate contentKey="global.menu.entities.vendor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/container">
      <Translate contentKey="global.menu.entities.container" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/driver">
      <Translate contentKey="global.menu.entities.driver" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/region">
      <Translate contentKey="global.menu.entities.region" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/department">
      <Translate contentKey="global.menu.entities.department" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/task">
      <Translate contentKey="global.menu.entities.task" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee">
      <Translate contentKey="global.menu.entities.employee" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/job">
      <Translate contentKey="global.menu.entities.job" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/job-history">
      <Translate contentKey="global.menu.entities.jobHistory" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
