import React from 'react'
import { withAdminGuard } from '../../hocs/with-admin-guard'

const DManageLeave = () => {
  return (
    <div>DManageLeave เฉพาะ ADMIN เท่านั้น</div>
  )
}

export default withAdminGuard(DManageLeave)

