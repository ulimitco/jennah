import React from 'react'
import {
  MainLayout,
  AdminDashboard,
  AdminUsersMgmt,
  AdminCategoriesMgmt,
  AdminItemsMgmt,
  AdminSuppliersMgmt,
  AdminSettings,
  AdminBranchesMgmt,
  AdminModifierMgmt,
  InventoryMgmt,
} from 'components'

import { Route } from 'react-router-dom'

export default class AdminContainer extends React.Component {
  render() {
    return (
      <MainLayout pageTitle="dashboard" role="admin" {...this.props}>
        <Route path={'/admin'} exact render={() => <AdminDashboard {...this.props} />} />
        <Route path={'/admin/users'} exact render={() => <AdminUsersMgmt {...this.props} />} />
        <Route path={'/admin/branches'} exact render={() => <AdminBranchesMgmt {...this.props} />} />
        <Route path={'/admin/categories'} exact render={() => <AdminCategoriesMgmt {...this.props} />} />
        <Route path={'/admin/items'} exact render={() => <AdminItemsMgmt {...this.props} />} />
        <Route path={'/admin/suppliers'} exact render={() => <AdminSuppliersMgmt {...this.props} />} />
        <Route path={'/admin/inventories'} exact render={() => <InventoryMgmt {...this.props} />} />
        <Route path={'/admin/modifiers'} exact render={() => <AdminModifierMgmt {...this.props} />} />
        <Route path={'/admin/settings'} exact render={() => <AdminSettings {...this.props} />} />
      </MainLayout>
    )
  }
}
