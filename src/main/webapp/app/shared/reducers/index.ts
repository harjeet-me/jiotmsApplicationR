import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import booking, {
  BookingState
} from 'app/entities/booking/booking.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice.reducer';
// prettier-ignore
import invoiceItem, {
  InvoiceItemState
} from 'app/entities/invoice-item/invoice-item.reducer';
// prettier-ignore
import insurance, {
  InsuranceState
} from 'app/entities/insurance/insurance.reducer';
// prettier-ignore
import contact, {
  ContactState
} from 'app/entities/contact/contact.reducer';
// prettier-ignore
import bookingItem, {
  BookingItemState
} from 'app/entities/booking-item/booking-item.reducer';
// prettier-ignore
import equipment, {
  EquipmentState
} from 'app/entities/equipment/equipment.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import vendor, {
  VendorState
} from 'app/entities/vendor/vendor.reducer';
// prettier-ignore
import container, {
  ContainerState
} from 'app/entities/container/container.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import region, {
  RegionState
} from 'app/entities/region/region.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import job, {
  JobState
} from 'app/entities/job/job.reducer';
// prettier-ignore
import jobHistory, {
  JobHistoryState
} from 'app/entities/job-history/job-history.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly booking: BookingState;
  readonly invoice: InvoiceState;
  readonly invoiceItem: InvoiceItemState;
  readonly insurance: InsuranceState;
  readonly contact: ContactState;
  readonly bookingItem: BookingItemState;
  readonly equipment: EquipmentState;
  readonly customer: CustomerState;
  readonly vendor: VendorState;
  readonly container: ContainerState;
  readonly driver: DriverState;
  readonly location: LocationState;
  readonly region: RegionState;
  readonly country: CountryState;
  readonly department: DepartmentState;
  readonly task: TaskState;
  readonly employee: EmployeeState;
  readonly job: JobState;
  readonly jobHistory: JobHistoryState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  booking,
  invoice,
  invoiceItem,
  insurance,
  contact,
  bookingItem,
  equipment,
  customer,
  vendor,
  container,
  driver,
  location,
  region,
  country,
  department,
  task,
  employee,
  job,
  jobHistory,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
