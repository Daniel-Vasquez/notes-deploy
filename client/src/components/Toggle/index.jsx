export const Toggle = ({ handleDarkMode }) => {
  return (
    <div className="fixed top-4 right-4 z-10 flex items-center gap-3">
      <span className="text-3xl">🌞</span>
      <label
        className="bg-black inline-block rounded-3xl items-center cursor-pointer select-none text-dark dark:text-white"
      >
        <div className="relative">
          <input
            onClick={handleDarkMode}
            type="checkbox"
            className="peer sr-only"
          />
          <div className="block h-8 rounded-full dark:bg-dark-2 bg-gray-3 w-14"></div>
          <div className="absolute w-6 h-6 transition bg-white rounded-full dot dark:bg-dark-4 left-1 top-1 peer-checked:translate-x-full peer-checked:bg-primary"></div>
        </div>
      </label>
      <span className="text-3xl">🌚</span>
    </div>
  )
}
