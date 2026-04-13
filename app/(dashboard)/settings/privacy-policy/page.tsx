'use client'

import { RichTextEditor } from '@/components/settings/RichTextEditor'

const PrivacyPolicyPage = () => {
  const defaultContent = `By using the app, you agree to create an account and keep your login information secure. Users can book appointments, and service providers manage availability and appointments. Payments are handled between users and providers. Follow the provider's cancellation and refund policy. You must use the app responsibly, and we are not liable for any issues. The terms may change, and by continuing to use the app, you agree to any updates. For questions, contact us at [Contact Email].

By using the app, you agree to create an account and keep your login information secure. Users can book appointments, and service providers manage availability and appointments. Payments are handled between users and providers. Follow the provider's cancellation and refund policy. You must use the app responsibly, and we are not liable for any issues. The terms may change, and by continuing to use the app, you agree to any updates. For questions, contact us at [Contact Email].

Education also nurtures empathy and cultural awareness, fostering a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences, which is crucial in a world that is increasingly interconnected. This cultural competence not only enhances personal relationships but also strengthens international collaboration and peace.`

  return (
    <div className="space-y-6">
      <RichTextEditor
        title="Privacy policy"
        initialContent={defaultContent}
        onSave={(content) => console.log('Saved:', content)}
      />
    </div>
  )
}

export default PrivacyPolicyPage
