export default function OrderCompleteSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <div className="h-8 w-64 bg-blue-400 rounded animate-pulse"></div>
          <div className="h-6 w-48 bg-blue-400 rounded mt-2 animate-pulse"></div>
        </div>
        
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="h-6 w-48 bg-yellow-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 w-full bg-yellow-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-center">
          <div className="h-10 w-32 bg-blue-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
