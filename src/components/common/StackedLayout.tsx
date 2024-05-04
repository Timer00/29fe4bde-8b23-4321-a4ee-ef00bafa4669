import { Disclosure } from '@headlessui/react'
import { twJoin } from "tailwind-merge";
import React, { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface StackedLayoutProps<T extends string> {
  tabs: T[];
  children: ReactNode;
  selectedTab: T;
  setSelectedTab: Dispatch<SetStateAction<T>>;
}

export default function StackedLayout<T extends string>({
  tabs,
  selectedTab,
  setSelectedTab,
  children,
}: StackedLayoutProps<T>) {

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="w-full lg:border-b lg:border-gray-200 lg:bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {tabs.map((tab, i) => (
                        <a
                          key={i}
                          onClick={() => setSelectedTab(tab)}
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
                  <div className="flex items-center sm:hidden w-full">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="w-full relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <span>Country</span>
                      <ChevronDownIcon className="h-5 w-5 ui-open:rotate-180 ui-open:transform" aria-hidden="true" />
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {open && tabs.map((tab, i) => (
                    <Disclosure.Button
                      onClick={() => setSelectedTab(tab)}
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

        <div className={`py-10 hidden lg:block`}>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-wrap flex">{children}</div>
        </div>
      </div>
    </>
  )
}
