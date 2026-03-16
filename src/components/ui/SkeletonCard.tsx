export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0d14', border: '1px solid #1e1e2e' }}>
      <div className="skeleton aspect-video w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-full rounded-lg" />
        <div className="skeleton h-3 w-5/6 rounded-lg" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-4 w-16 rounded-md" />
          <div className="skeleton h-4 w-16 rounded-md" />
          <div className="skeleton h-4 w-16 rounded-md" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-9 flex-1 rounded-xl" />
          <div className="skeleton h-9 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
