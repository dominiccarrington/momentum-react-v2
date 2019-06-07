const path = require('path');

const settingsFiles = [
  '../../templates/settings.scss',
  '../colors/settings-base.scss',
  '../colors/settings-transparencies.scss',
  '../colors/settings-legacy.scss',
  '../settings/rem.scss',
  '../settings/core.scss',
  '../settings/focus.scss',
  '../settings/list-group.scss',
  '../settings/media.scss',
  '../settings/z-index.scss',
  '../settings/dropdown.scss',
  '../typography/settings.scss',
  '../components/input/settings.scss',
  '../components/accordion/settings.scss',
  '../components/alert/settings.scss',
  '../components/alert-banner/settings.scss',
  '../components/avatar/settings.scss',
  '../components/badge/settings.scss',
  '../components/breadcrumbs/settings.scss',
  '../components/button/settings.scss',
  '../components/button-group/settings.scss',
  '../components/card/settings.scss',
  '../components/checkbox/settings.scss',
  '../components/close/settings.scss',
  '../components/collapse-button/settings.scss',
  '../components/combo-box/settings.scss',
  '../components/date-picker/settings.scss',
  '../components/drawer/settings.scss',
  '../components/footer/settings.scss',
  '../components/forms/settings.scss',
  '../components/icon/settings.scss',
  '../components/input-phone-number/settings.scss',
  '../components/input-search/settings.scss',
  '../components/label/settings.scss',
  '../components/lightbox/settings.scss',
  '../components/list-item/settings.scss',
  '../components/meeting-list/settings.scss',
  '../components/loader/settings.scss',
  '../components/menu/settings.scss',
  '../components/modal/settings.scss',
  '../components/overlay/settings.scss',
  '../components/panel/settings.scss',
  '../components/pagination/settings.scss',
  '../components/page-header/settings.scss',
  '../components/popover/settings.scss',
  '../components/progress/settings.scss',
  '../components/radio/settings.scss',
  '../components/select/settings.scss',
  '../components/slider/settings.scss',
  '../components/tabs/settings.scss',
  '../components/toggle-switch/settings.scss',
  '../components/tooltip/settings.scss',
  '../components/top-bar/settings.scss',
  '../layouts/block-grid/settings.scss',
].map(file => path.resolve(__dirname, file));

const iconsSettingsFiles = [
  '../../../icons/scss/variables.scss',
  '../../../icons/scss/symphony/variable-mapping.scss',
].map(file => path.resolve(__dirname, file));

module.exports = iconsSettingsFiles.concat(settingsFiles);
