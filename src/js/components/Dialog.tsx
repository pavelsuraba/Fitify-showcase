import { Dialog as HeadlessDialog } from '@headlessui/react'
import { PropsWithChildren } from 'react'

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      fill="#9E9E9E"
      d="M11.627 1.728 7.385 5.97l4.242 4.242-1.414 1.414-4.242-4.242-4.243 4.242-1.414-1.414 4.242-4.242L.314 1.728 1.728.314 5.97 4.556 10.213.314l1.414 1.414Z"
    />
  </svg>
)

type Props = {
  isVisible: boolean
  onClose: () => void
}

export const Dialog = ({
  children,
  isVisible,
  onClose,
}: PropsWithChildren<Props>) => {
  return (
    <HeadlessDialog
      open={isVisible}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel className="relative mx-auto rounded-[10px] bg-white w-full h-full max-w-[650px] max-h-[470px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 outline-none"
          >
            <CloseIcon />
          </button>

          <div className="pt-10 px-4 pb-4 h-full">{children}</div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  )
}
