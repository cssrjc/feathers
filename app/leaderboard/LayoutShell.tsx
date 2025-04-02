import React from 'react'

interface Props {
  readonly children: React.ReactNode
}

export default function LayoutShell({ children }: Props) {
  return (
    <div className="App">
      <main className="container relative mx-auto max-w-screen-sm pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="font-serif text-2xl text-center text-gray-800 w-full border-b p-3">
            Winners
          </h2>

          {children}
        </div>
      </main>
    </div>
  )
}
