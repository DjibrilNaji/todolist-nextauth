export function Spinner() {
  return (
    <div className="flex h-full justify-center items-center">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      />
    </div>
  )
}
