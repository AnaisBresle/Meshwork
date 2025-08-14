import React from 'react'

const Article = () => {
    return (

        <div className="max-w-sm mx-auto grid gap-4 row-gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3" >
            <div className="flex flex-col justify-between p-4 bg-white rounded shadow-sm">
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                        <svg
                            className="w-6 h-6 text-indigo-500"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path

                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    <h6 className="mb-1 font-semibold text-gray-900">
                        Create a project
                    </h6>
                    <p className="text-sm text-gray-600">
                        Get your blood tests delivered at let home
                        collect sample from the victory of the
                        managements that supplies best design
                        system guidelines ever.
                    </p>
                </div>
                <a
                    href="#0"
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                    Learn more
                    <svg

                        className="inline-block w-3 ml-2"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                    >
                        <path
                            fillRule="evenodd"

                            d="M6 2a1 1 0 011 1v4.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L5 8.586V4a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </div >
    )
}

export default Article