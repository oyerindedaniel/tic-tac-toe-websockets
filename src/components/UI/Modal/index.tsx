import { Fragment, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Modal as ModalType } from './types';

export const Modal: FC<ModalType> = ({ onClose, isOpen, modalBody, modalTitle }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <Dialog.Panel>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                  {modalTitle}
                </Dialog.Title>

                <div className="mt-4">
                  <Dialog.Description as="p" className="text-lg">
                    {modalBody}
                  </Dialog.Description>
                </div>

                <div className="mt-4 ml-auto flex justify-end gap-3">
                  <button
                    className="button button--md button--bg-gray font-semibold"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="button button--md button--bg-lightBlue font-semibold"
                    type="button"
                    onClick={onClose}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};
