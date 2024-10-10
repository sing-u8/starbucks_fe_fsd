export default function BaseLoader({ className = "" }) {
  return (
    <div className={`mt-10 flex justify-center gap-4 ${className}`}>
      <div className="h-2 w-2 animate-ping rounded-full bg-gray-500" />
      <div className="h-2 w-2 animate-ping rounded-full bg-gray-500" />
      <div className="h-2 w-2 animate-ping rounded-full bg-gray-500" />
    </div>
  )
}
