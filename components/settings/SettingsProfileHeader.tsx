'use client'

export function SettingsProfileHeader() {
  return (
    <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
              alt="Maria"
              className="w-full h-full"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Maria</h2>
          <p className="text-blue-100">Admin</p>
        </div>
      </div>
    </div>
  )
}
