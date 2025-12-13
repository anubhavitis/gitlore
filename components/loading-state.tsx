export function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center space-y-4 bg-black/30 backdrop-blur-md border border-neutral-800/60 px-8 py-6 rounded-2xl">
        <div className="relative">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-neutral-800 border-t-white mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 bg-white rounded-full"></div>
          </div>
        </div>
        <p className="text-base text-neutral-400 font-medium">{message}</p>
      </div>
    </div>
  )
}
