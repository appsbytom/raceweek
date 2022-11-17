const SkeletonWeekList = ({ activityCounts }: { activityCounts: number[] }) => (
  <ul className="animate-pulse flex flex-col gap-4">
    {activityCounts.map((numOfActivities, i) => (
      <li key={`skeleton-${i}`} className="flex-1">
        <div className="h-3 mb-1 rounded-full bg-gray-300" />
        <div className="border border-gray-200">
          {Array.from({ length: numOfActivities }).map((_, i) => (
            <div key={`skeleton-activity-${i}`} className="border-b last:border-b-0 flex">
              <div className="w-3 rounded-none bg-gray-200" />
              <div className="py-2 px-4 flex-1">
                <div className="h-6 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </li>
    ))}
  </ul>
)

export default SkeletonWeekList