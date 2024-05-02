import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { twJoin } from "tailwind-merge";
import { type ReactNode, useState } from "react";

interface StackedLayoutProps {
  tabs: string[];
  children: ReactNode;
}

export default function StackedLayout({tabs , children}: StackedLayoutProps) {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0] ?? '');

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {tabs.map((tab, i) => (
                        <a
                          key={i}
                          onClick={()=>setSelectedTab(tab)}
                          className={twJoin(
                            tab === selectedTab
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'cursor-pointer inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                          )}
                          aria-current={tab === selectedTab ? 'page' : undefined}
                        >
                          {tab}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {tabs.map((tab, i) => (
                    <Disclosure.Button
                      onClick={()=>setSelectedTab(tab)}
                      key={i}
                      as="a"
                      className={twJoin(
                        tab === selectedTab
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                        'cursor-pointer block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={tab === selectedTab ? 'page' : undefined}
                    >
                      {tab}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-wrap flex">{children}</div>
        </div>
      </div>
    </>
  )
}
