'use client'

import { ChangePasswordForm } from '@/components/settings/ChangePasswordForm'
import { SettingsProfileHeader } from '@/components/settings/SettingsProfileHeader'
import { SettingsTabs } from '@/components/settings/SettingsTabs'

const ChangePasswordPage = () => {
  return (
    <div className="space-y-6">
      <SettingsProfileHeader />
      <div className="bg-white rounded-lg p-6">
        <SettingsTabs />
        <ChangePasswordForm />
      </div>
    </div>
  )
}

export default ChangePasswordPage
