'use client'

import Image from 'next/image'

const integrations = [
  {
    name: 'Google Docs',
    icon: '/icons/googledocs.svg',
    description: '1-click export to Docs',
  },
  {
    name: 'Medium',
    icon: '/icons/medium.svg',
    description: 'Copy & paste formatted HTML',
  },
  {
    name: 'WordPress',
    icon: '/icons/wordpress.svg',
    description: 'Publish directly to your blog',
  },
  {
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    description: 'Auto-generate social teasers',
  },
]

export default function IntegrationGrid() {
  return (
    <section className="py-24 " id="integrations">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Integrate with Tools You Already Use
        </h2>
        <p className="mt-2 text-gray-600 text-base sm:text-lg">
          Wordywrites connects seamlessly to your publishing stack.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 px-6">
        {integrations.map((integration, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-white shadow-lg rounded-full transition-transform group-hover:scale-110">
              <Image
                src={integration.icon}
                alt={integration.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">{integration.name}</p>
            <p className="text-xs text-gray-500">{integration.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
