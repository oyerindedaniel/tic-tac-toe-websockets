import { Fragment, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Modal as ModalType,
  ModalTitle as ModalTitleType,
  ModalBody as ModalBodyType,
  ModalFooter as ModelFooterType
} from './types';

export const ModalTitle: FC<ModalTitleType> = ({ children }) => {
  return (
    <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
      {children}
    </Dialog.Title>
  );
};

export const ModalBody: FC<ModalBodyType> = ({ children }) => {
  return (
    <div className="mt-4">
      <Dialog.Description as="p" className="text-lg">
        {children}
      </Dialog.Description>
    </div>
  );
};

export const ModalFooter: FC<ModelFooterType> = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
export const Modal: FC<ModalType> = ({ onClose, isOpen, closeOnOverlayClick, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeOnOverlayClick ? onClose : () => {}}
      >
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
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};
