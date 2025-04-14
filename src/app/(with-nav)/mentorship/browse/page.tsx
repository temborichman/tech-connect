  <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
    {/* Logo */}
    <div className="mb-8">
      <Image
        src="/logo.png"
        alt="Tech Connect Logo"
        width={120}
        height={120}
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
      />
    </div>

    {/* Title */}
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
      Browse Mentors
    </h1>

    {/* Description */}
    <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md md:max-w-lg lg:max-w-2xl">
      Find the perfect mentor to guide you in your tech journey
    </p>

    {/* Search Bar */}
    <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search mentors..."
          className="w-full py-2 px-4 pr-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[#1A73E8] text-sm md:text-base"
        />
        <FaSearch className="absolute right-3 top-3 text-gray-400" />
      </div>
    </div>

    {/* Filters */}
    <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 rounded-full bg-[#1A73E8] text-white text-sm md:text-base hover:bg-[#1557B0] transition-colors">
          All
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm md:text-base hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Web Development
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm md:text-base hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Mobile Development
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm md:text-base hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Data Science
        </button>
      </div>
    </div>

    {/* Mentor Cards */}
    <div className="w-full max-w-md md:max-w-lg lg:max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {mentors.map((mentor, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Image
              src={mentor.image}
              alt={mentor.name}
              width={48}
              height={48}
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                {mentor.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {mentor.role}
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base line-clamp-3">
            {mentor.bio}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs md:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          <button className="w-full py-2 px-4 bg-[#1A73E8] text-white rounded-lg font-medium hover:bg-[#1557B0] transition-colors text-sm md:text-base">
            Connect
          </button>
        </div>
      ))}
    </div>
  </div> 