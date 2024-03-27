const SkeletonWeekList = ({ activityCounts }: { activityCounts: number[] }) => (
  <ul className="animate-pulse flex flex-col gap-3">
    {activityCounts.map((numOfActivities, i) => (
      <li key={`skeleton-${i}`} className="flex-1">
        <div className="h-9 mb-1 bg-gray-300" />
        <div className="divide-y">
          {Array.from({ length: numOfActivities }).map((_, i) => (
            <div key={`skeleton-activity-${i}`} className="flex">
              <div className="py-2 px-3 flex-1 flex gap-3">
                <div className="size-9 rounded-none bg-gray-200" />
                <div className="flex-1 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </li>
    ))}
  </ul>
)

export default SkeletonWeekList